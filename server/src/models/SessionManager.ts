import {Session} from "./Session";
import {Socket} from "socket.io"
import {SocketConfig} from "./SocketConfig";
import {Client} from "./Client";


export class SessionManager {
    sessions: Map<string, Session> // socket_id:Session
    socketConfig: SocketConfig


    constructor(socketConfig: SocketConfig) {
        this.sessions = new Map([])
        this.socketConfig = socketConfig
    }

    createSession(socket:Socket): Session {
        const session = new Session(socket.id, socket)
        this.sessions.set(socket.id, session)
        this.update()
        return session
    }

    startSessions():void {
        this.sessions.forEach(session=>{
            session.gameLoop()
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

    getSession(id: string): Session | undefined {
        return this.sessions.get(id)
    }

    joinSession(id: string, socket:Socket): Session | undefined {
        const session: Session | undefined = this.getSession(id)
        if (session) {
            session.addClient(socket)
            this.update()
            return session
        }
    }


    leaveSession(id:string, socket:Socket):boolean {
        const session: Session | undefined = this.getSession(id)
        if(session) {
            session.deleteClient(socket)
            if(session.owner.id===socket.id){
                this.closeSession(session.id, socket)
            }
            this.update()
            return true
        }
        return false
    }


    closeSession(id: string, socket:Socket):boolean {
        const session = this.sessions.get(id)
        if(session){
            if(session.owner.socket.id===socket.id){
                session.close()
                this.sessions.delete(id)
                this.update()
                return true
            }
        }
        return false
    }

    update(){
        this.socketConfig.updateSession()
    }
}