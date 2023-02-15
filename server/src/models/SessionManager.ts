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
        this.update()
        return true
    }

    startSessions():void {
        this.sessions.forEach(session=>{
            session.upGame()
        })
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

    joinSession(id: number, client: Client): Session | undefined {
        const session: Session | undefined = this.getSession(id)
        if (session) {
            session.attachClient(client)
            this.update()
            return session
        }
    }


    leaveSession(id:number, client:Client):boolean {
        const session: Session | undefined = this.getSession(id)
        if(session) {
            session.removeClient(client)
            this.update()
            return true
        }
        return false
    }


    closeSession(id: number, client:Client):boolean {
        const session = this.sessions.get(id)
        if(session?.owner.id===client.id){
            session.close()
            this.sessions.delete(id)
            this.update()
            return true
        }
        return false
    }

    update(){
        this.socketConfig.update("session-list", this.getSessions())
    }
}