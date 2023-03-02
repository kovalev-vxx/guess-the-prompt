import {Game, STATE} from "./Game";
import {Socket} from "socket.io"
import {Client} from "./Client";
import axios from "axios"


export class Session {
    id: string;
    owner: Client
    clients: Map<string, Client>

    created_at: number
    game: Game
    lastGameState: STATE
    gameJSON: string

    constructor(id: string, socket: Socket) {
        this.id = id
        this.owner = new Client(socket, this)
        this.clients = new Map([]);
        this.clients.set(socket.id, this.owner)
        this.created_at = Date.now()
        this.game = new Game(this)
        this.lastGameState = this.game.state
        this.gameJSON = JSON.stringify(this.game)
        this.owner.isReady()
    }

    gameLoop() {
        this.game.update()
    }

    startGame() {
        this.game.started = true
        this.game.players.forEach(player => {
            player.client.socket.emit("game-started", this)
        })
    }

    finishGame() {
        this.game.players.forEach(player => {
            player.client.socket.emit("game-finished", this)
        })
    }

    setPrompt(client: Client, prompt: string) {
        const ai_image_link = `${process.env.AI_SERVICE_LINK}/image/${prompt}`
        axios.get(ai_image_link, {responseType: 'arraybuffer'}).then(image => {
            this.game.players.forEach(player => {
                player.client.socket.emit("image", Buffer.from(image.data).toString('base64'))
            })
            this.game.setPrompt(client,prompt)
        })
    }

    addGuess(client: Client, guess: string) {
        this.game.addGuess(client, guess)
    }

    close() {
        console.log(`session ${this.id} closed`)
    }

    addClient(socket: Socket): boolean {
        if (socket.id !== this.owner.socket.id || !this.game.started) {
            this.clients.set(socket.id, new Client(socket, this))
            return true
        }
        return false
    }


    deleteClient(socket: Socket) {
        this.clients.delete(socket.id)
    }

    getClientsAsArray(): Client[] {
        return [...this.clients.values()]
    }

    clientIsReady(client: Client) {
        this.game.addPlayer(client)
    }

    clientNotReady(client: Client) {
        this.game.removePlayer(client)
    }

    broadcastGame() {
        this.game.players.forEach(player => {
            player.client.socket.emit("game", this.game)
        })
    }

    observeGame() {
        if (this.gameJSON !== JSON.stringify(this.game)) {
            console.log(this.game.state, this.game.prompt, this.game.guesses.size, this.game.leader.client.id, this.game.leader_queue.length)
            this.broadcastGame()
        }
        this.gameJSON = JSON.stringify(this.game)
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