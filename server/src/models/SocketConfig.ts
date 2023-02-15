import {SessionManager} from "./SessionManager";
import {ClientManager} from "./ClientManager";
import {Server, Socket} from "socket.io";
import * as http from "http";
import {Server as HTTPSServer} from "https";
import {Http2SecureServer} from "http2";
import {Client} from "./Client";
import {Session} from "./Session";

interface PromptMessage {
    prompt: string
    id: number
}

interface GuessMessage {
    guess: string
    id: number
}


export class SocketConfig {
    sessionManager: SessionManager
    clientManager: ClientManager
    io: Server


    constructor(server: http.Server | HTTPSServer | Http2SecureServer | number) {
        this.sessionManager = new SessionManager(this)
        this.clientManager = new ClientManager(this);
        this.io = new Server(server, {
            cors: {
                origin: '*'
            }
        })
    }

    handler(socket:Socket){
        const client: Client | undefined = this.clientManager.getClient(socket.id)
        const auth = ({username}:Client) => {
            const client:Client = this.clientManager.addClient(username, socket)
            socket.emit("session-list", this.sessionManager.getSessions())
            socket.emit("auth", client)
        }

        const createSession = () => {
            const id = Date.now();
            const client: Client | undefined = this.clientManager.getClient(socket.id)

            if (client) {
                if(!this.sessionManager.createSession(id, client)){
                    socket.emit("session-error", {message: "You already have a session"})
                }
            }
        }

        const closeSession = ({id}:Session) => {
            const client = this.clientManager.getClient(socket.id)
            if(client){
                this.sessionManager.closeSession(id, client)
            }
        }

        const joinSession = ({id}:Session) => {
            const client: Client | undefined = this.clientManager.getClient(socket.id)
            if(client){
                const session: Session | undefined = this.sessionManager.joinSession(id, client)
                if (session) {
                    socket.emit("join-session", session)
                } else {
                    socket.emit("error", {message: "something wrong"})
                }
            }
        }

        const leaveSession = ({id}:Session) => {
            const client: Client | undefined = this.clientManager.getClient(socket.id)
            if(client){
                this.sessionManager.leaveSession(id, client)
                socket.emit("leave-session")
            }
        }

        const clientReady = ({id}:Session) => {
            const client: Client | undefined = this.clientManager.getClient(socket.id)
            const session: Session | undefined = this.sessionManager.getSession(id)
            if(client && session){
                session.clientIsReady(client)
            }
        }

        const clientNotReady = ({id}:Session) => {
            const client: Client | undefined = this.clientManager.getClient(socket.id)
            const session: Session | undefined = this.sessionManager.getSession(id)
            if(client && session){
                session.clientNotReady(client)
            }
        }

        const startGame = ({id}:Session) => {
            const client: Client | undefined = this.clientManager.getClient(socket.id)
            const session: Session | undefined = this.sessionManager.getSession(id)
            if(client && session && session.owner.id === client.id){
                session.startGame()
            }
        }

        const setPrompt = ({id, prompt}:PromptMessage) => {
            // const client: Client | undefined = this.clientManager.getClient(socket.id)
            const session: Session | undefined = this.sessionManager.getSession(id)
            if(client && session && session.owner.id === client.id){
                session.setPrompt(prompt)
            }
        }

        const makeGuess = ({id, guess}:GuessMessage) => {
            const client: Client | undefined = this.clientManager.getClient(socket.id)
            const session: Session | undefined = this.sessionManager.getSession(id)
            if(client && session && session.owner.id !== client.id){
                session.addGuess(client, guess)
            }
        }



        socket.on("close-session", closeSession)
        socket.on("join-session", joinSession)
        socket.on("leave-session", leaveSession)
        socket.on("client-ready", clientReady)
        socket.on("client-not-ready", clientNotReady)
        socket.on("start-game", startGame)
        socket.on("prompt", setPrompt)
        socket.on("makeGuess", makeGuess)

        socket.on("create-session", createSession)
        socket.on("auth", auth)
    }



    update(event:string, object:any) {
        this.clientManager.clients.forEach((client:Client)=>{
            client.socket.emit(event, object)
        })
    }


    listen() {
        this.io.on("connection", (socket) => {
            setInterval(()=>{
                this.sessionManager.startSessions()
            }, 1000)
            console.log("user is connected")
            this.handler(socket)

            socket.on("disconnect", () => {
                console.log("user disconnected")
            })
        })

    }
}