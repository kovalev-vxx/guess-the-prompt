import {Socket} from "socket.io";
import {Session} from "./Session";
import {ClientManager} from "./ClientManager";

export class Client {
    username: string
    id: string
    socket: Socket

    constructor(username: string, socket: Socket) {
        this.id = socket.id
        this.username = username
        this.socket = socket
        this.socketHandler()
    }


    socketHandler(): void {
        // this.socket.on("session-list", () => {
        //     this.socket.emit("session-list", this.clientManager..sessionManager.getSessions())
        // })
    }

    joinToSession(session: Session) {
        session.attachClient(this)
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username
        }
    }

}