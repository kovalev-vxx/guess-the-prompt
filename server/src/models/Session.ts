import {Game} from "./Game";
import {Application} from "express-ws";
import {Socket} from "socket.io"
import {Client} from "./Client";

export class Session {
    id: number;
    // ws:WebSocket
    owner: Client
    clients: Map<string, Client>

    created_at:number


    constructor(id: number, owner:Client) {
        this.id = id
        this.owner = owner
        this.owner.socket.emit("room-created", {id: this.id})
        this.clients = new Map([]);
        this.created_at = Date.now()
    }

    up() {

    }

    close() {
        console.log(`session ${this.id} closed`)
    }

    attachClient(client: Client) {
        this.clients.set(client.id, client)
    }

    toJSON() {
        return {
            id: this.id,
            owner: this.owner,
            created_at: this.created_at,
            clients: this.clients.size
        }
    }
}