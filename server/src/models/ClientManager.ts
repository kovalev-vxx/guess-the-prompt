import {Client} from "./Client";
import {Socket} from "socket.io";
import {SessionManager} from "./SessionManager";
import {SocketConfig} from "./SocketConfig";
import {Session} from "./Session";

export class ClientManager {
    clients: Map<string, Client>
    socketConfig: SocketConfig

    constructor(socketConfig: SocketConfig) {
        this.clients = new Map([]);
        this.socketConfig = socketConfig
    }

    getClients() {
        return [...this.clients.values()]
    }

    addClient(username: string, socket: Socket): Client {
        const client = new Client(username, socket)
        this.clients.set(socket.id, client)
        return client
    }

    getClient(id: string): Client | undefined {
        return this.clients.get(id)
    }
}