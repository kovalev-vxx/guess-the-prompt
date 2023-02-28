import {SessionManager} from "./SessionManager";
import {Server, Socket} from "socket.io";
import * as http from "http";
import {Server as HTTPSServer} from "https";
import {Http2SecureServer} from "http2";
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
    io: Server

    constructor(server: http.Server | HTTPSServer | Http2SecureServer | number) {
        this.sessionManager = new SessionManager(this)
        this.io = new Server(server, {
            cors: {
                origin: '*'
            }
        })
    }

    handler(socket:Socket){
        socket.emit("session-list", this.sessionManager.getSessions())

        const createSession = () => {
            console.log("create")
            joinSession(this.sessionManager.createSession(socket))
        }

        const closeSession = ({id}:Session) => {
            console.log("close")
            this.sessionManager.closeSession(id, socket)
        }

        const joinSession = ({id}:Session) => {
            console.log("join")
            const session = this.sessionManager.joinSession(id,socket)
            if(session){
                socket.emit("join-session", session)
            }
        }

        const leaveSession = ({id}:Session) => {
            console.log("leave")
            this.sessionManager.leaveSession(id, socket)
            socket.emit("leave-session")
        }

        const sessionList = () => {
            socket.emit("session-list", this.sessionManager.getSessions())
        }


        socket.on("close-session", closeSession)
        socket.on("join-session", joinSession)
        socket.on("leave-session", leaveSession)


        socket.on("create-session", createSession)
        socket.on("session-list", sessionList)
    }

    updateSession(){
        this.io.emit("session-list", this.sessionManager.getSessions())
    }

    listen() {
        this.io.on("connection", (socket) => {
            setInterval(()=>{
                this.sessionManager.startSessions()
            }, 10)
            console.log("user is connected")
            this.handler(socket)
            socket.on("disconnect", () => {
                console.log("user disconnected")
            })
        })

    }
}

