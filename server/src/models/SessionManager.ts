import {Session} from "./Session";
import {Socket} from "socket.io"
import {SocketConfig} from "./SocketConfig";
import {Client} from "./Client";


export class SessionManager {
    sessions: Map<number, Session>
    socketConfig: SocketConfig


    constructor(socketConfig: SocketConfig) {
        this.sessions = new Map([])
        this.socketConfig = socketConfig
    }

    createSession(id: number, client: Client): boolean {
        if (this.getSessionByOwner(client)) {
            return false
        }
        this.sessions.set(id, new Session(id, client))
        return true
    }

    getSessions() {
        return [...this.sessions.values()]
    }

    getSessionByOwner(owner: Client): Session | undefined {
        return [...this.sessions.values()].find((session) => {
            return session.owner === owner
        })
    }

    getSession(id: number): Session | undefined {
        return this.sessions.get(id)
    }

    closeSession(id: number, socket: Socket) {
        const session = this.sessions.get(id)
        session && session.close()
        this.sessions.delete(id)
    }
}