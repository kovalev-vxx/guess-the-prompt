import {Game, STATE} from "./Game";
import {Application} from "express-ws";
import {Socket} from "socket.io"
import {Client} from "./Client";
import {Player} from "./Player";

// interface IObservableGameFields {
//     state:STATE
//     playersCount:number
//     canStart:boolean,
//     currentRound:number,
//     started:boolean
// }

export class Session {
    id: number;
    // ws:WebSocket
    owner: Client
    clients: Map<string, Client>

    created_at:number
    game:Game
    lastGameState:STATE
    gameJSON: string

    constructor(id: number, owner:Client) {
        this.id = id
        this.owner = owner
        this.owner.socket.emit("room-created", {id: this.id})
        this.clients = new Map([]);
        this.created_at = Date.now()
        this.game = new Game(this)
        this.lastGameState = this.game.state
        this.gameJSON = JSON.stringify(this.game)
    }

    upGame() {
        this.game.update()
    }

    startGame(){
        this.game.started = true
        this.game.players.forEach(player=>{
            player.client.socket.emit("game-started", this)
        })
    }

    setPrompt(prompt:string){
        this.game.prompt = prompt
    }

    addGuess(client:Client, guess:string){

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
        this.game.addPlayer(client)
    }

    clientNotReady(client:Client){
        client.notReady()
        this.game.removePlayer(client)
    }

    observeGame(game:Game){
        if(this.gameJSON !== JSON.stringify(game)){
            this.game.players.forEach(player=>{
                player.client.socket.emit("game", game)
            })
        }
        this.gameJSON = JSON.stringify(game)
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