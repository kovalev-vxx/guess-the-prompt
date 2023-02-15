import {Socket} from "socket.io";
import {Session} from "./Session";
import {ClientManager} from "./ClientManager";

export class Client {
    username: string
    id: string
    socket: Socket
    is_ready: boolean

    constructor(username: string, socket: Socket) {
        this.id = socket.id
        this.username = username
        this.socket = socket
        this.is_ready = false
    }

    joinToSession(session: Session) {
        session.attachClient(this)
    }

    ready(){
        this.is_ready = true
    }

    notReady(){
        this.is_ready = false
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username
        }
    }

}