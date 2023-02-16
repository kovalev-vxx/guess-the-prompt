import {Socket} from "socket.io";
import {Session} from "./Session";


interface PromptMessage {
    prompt: string
}

interface UsernameMessage {
    username: string
}

interface GuessMessage {
    guess: string
}

export class Client {
    username?: string
    id: string
    socket: Socket
    is_ready: boolean
    session:Session

    constructor(socket: Socket, session:Session) {
        this.id = socket.id
        this.username = socket.id
        this.socket = socket
        this.is_ready = false
        this.session = session
        this.socket.emit("auth", this)
        this.handler()
    }

    isReady(){
        this.is_ready = true
        this.session.clientIsReady(this)
    }

    isNotReady(){
        this.is_ready = false
        this.session.clientNotReady(this)
    }

    handler(){
        const clientReady = () => {
            this.isReady()
        }

        const clientNotReady = () => {
            this.isNotReady()
        }

        const setUsername = ({username}:UsernameMessage) => {
            this.username = username
        }

        const startGame = () => {
            this.session.startGame()
        }

        const setPrompt = ({prompt}:PromptMessage) => {
            this.session.setPrompt(this, prompt)
        }

        const makeGuess = ({guess}:GuessMessage) => {
            this.session.addGuess(this, guess)
        }

        this.socket.on("start-game", startGame)
        this.socket.on("client-ready", clientReady)
        this.socket.on("client-not-ready", clientNotReady)
        this.socket.on("set-username", setUsername)
        this.socket.on("prompt", setPrompt)
        this.socket.on("guess", makeGuess)
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