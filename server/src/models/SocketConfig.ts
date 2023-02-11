import {SessionManager} from "./SessionManager";
import {ClientManager} from "./ClientManager";
import {Server} from "socket.io";
import * as http from "http";
import {Server as HTTPSServer} from "https";
import {Http2SecureServer} from "http2";
import {Client} from "./Client";
import {Session} from "./Session";

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

    listen() {
        this.io.on("connection", (socket) => {
            console.log("user is connected")
            socket.on("auth", ({username}) => {
                const client:Client = this.clientManager.addClient(username, socket)
                socket.emit("session-list", this.sessionManager.getSessions())
                socket.emit("auth", client)
            })
            socket.on("create-session", () => {
                const id = Date.now();
                const client: Client | undefined = this.clientManager.getClient(socket.id)

                if (client) {
                    if (this.sessionManager.createSession(id, client)) {
                        this.clientManager.clients.forEach((client) => {
                            client.socket.emit("session-list", this.sessionManager.getSessions())
                        })
                    } else {
                        socket.emit("session-error", {message: "You already have a session"})
                    }
                }
            })
            socket.on("close-session", ({id}) => {
                this.sessionManager.closeSession(id, socket)
            })
            socket.on("disconnect", () => {
                console.log("user disconnected")
            })
            socket.on("join-session", ({id}) => {
                const client: Client | undefined = this.clientManager.getClient(socket.id)
                const session: Session | undefined = this.sessionManager.getSession(id)
                if (session && client) {
                    session.attachClient(client)
                    this.clientManager.clients.forEach((client) => {
                        client.socket.emit("session-list", this.sessionManager.getSessions())
                    })
                    socket.emit("join-session", id)
                } else {
                    socket.emit("error", {message: "something wrong"})
                }
            })
        })

    }
}