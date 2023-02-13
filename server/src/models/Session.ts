import {Game} from "./Game";
import {Application} from "express-ws";
import {Socket} from "socket.io"
import {Client} from "./Client";
import {Player} from "./Player";

export class Session {
    id: number;
    // ws:WebSocket
    owner: Client
    clients: Map<string, Client>

    created_at:number
    game:Game


    constructor(id: number, owner:Client) {
        this.id = id
        this.owner = owner
        this.owner.socket.emit("room-created", {id: this.id})
        this.clients = new Map([]);
        this.created_at = Date.now()
        this.game = new Game(this)
    }

    start() {
        this.game.update()
    }


    close() {
        console.log(`session ${this.id} closed`)
    }

    attachClient(client: Client) {
        this.clients.set(client.id, client)
    }

    removeClient(client:Client) {
        this.clients.delete(client.id)
    }

    getClientsAsArray():Client[] {
        return [...this.clients.values()]
    }

    clientIsReady(client:Client){
        client.ready()
        const player = new Player(client)
        this.game.addPlayer(player)
    }

    clientNotReady(client:Client){
        client.notReady()
        const player = this.game.players.get(client.id)
        if(player){
            this.game.removePlayer(player)
        }
    }

    toJSON() {
        return {
            id: this.id,
            owner: this.owner,
            created_at: this.created_at,
            clients_count: this.clients.size,
            clients: this.getClientsAsArray()
        }
    }
}