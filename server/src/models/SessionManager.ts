import {Session} from "./Session";
import {Socket} from "socket.io"


export class SessionManager {
    sessions: Map<number, Session>


    constructor() {
        this.sessions = new Map([])
    }

    createSession(id:number, socket: Socket): boolean {
        if (this.getSessionByOwner(socket.id)){
            return false
        }
        this.sessions.set(id, new Session(id, socket))
        return true
    }

    getSessions() {
        return [...this.sessions.values()]
    }

    getSessionByOwner(owner:string):Session | undefined {
        return [...this.sessions.values()].find((session)=>{
            return session.owner === owner
        })
    }

    closeSession(id: number, socket: Socket) {
        const session = this.sessions.get(id)
        session && session.close()
        this.sessions.delete(id)
    }
}