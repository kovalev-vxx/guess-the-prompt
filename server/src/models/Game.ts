import {Player} from "./Player";
import {Socket} from "socket.io";
import {Client} from "./Client";
import {Session} from "./Session";

export enum STATE {
    WAITING = "WAITING",
    CAN_START = "CAN_START",

    PREPARE = "PREPARE",

    WAITING_PROMPT = "WAITING_PROMPT",

    WAITING_GUESSES = "WAITING_GUESSES",

    WAITING_RESULT = "WAITING_GUESSES",
    ENDING = "ENDING",

}

export class Game {
    state: STATE
    players: Map<string, Player>

    session: Session
    canStart: boolean
    leader: Player
    maxRounds: number
    currentRound: number
    started: boolean
    prompt: string
    guesses: Map<string, string> // client_id:result
    results: Map<string, string> // client_id:result
    leader_queue: Player[]
    leader_number: number


    constructor(session: Session) {
        this.state = STATE.WAITING;
        this.players = new Map([])
        this.session = session
        this.canStart = false
        this.maxRounds = 3
        this.currentRound = 1
        this.started = false
        this.players.set(this.session.owner.id, new Player(this.session.owner))
        this.leader_queue = [...this.players.values()]
        this.leader_number = 0
        this.leader = this.leader_queue[this.leader_number]
        this.prompt = ""
        this.results = new Map([])
        this.guesses = new Map([])
    }

    addGuess(client: Client, guess: string): boolean {
        if (client.id !== this.leader.client.id) {
            this.guesses.set(client.id, guess)
            return true
        }
        return false
    }

    setPrompt(client: Client, prompt: string): boolean {
        if (client.id === this.leader.client.id) {
            this.prompt = prompt
            return true
        }
        return false
    }


    addPlayer(client: Client) {
        const player = new Player(client)
        this.players.set(player.client.id, player)
    }

    removePlayer(client: Client) {
        this.players.delete(client.id)
    }

    canStartCheck() {
        if (this.players.size >= 2) {
            this.canStart = true
            this.state = STATE.CAN_START
        }
    }

    newRound() {
        this.leader_number += 1
        this.leader = this.leader_queue[this.leader_number]
        this.currentRound += 1
        this.prompt = ""
        this.results = new Map([])
        this.guesses = new Map([])
    }

    update() {
        switch (this.state) {
            case STATE.WAITING: {
                this.canStartCheck()
                break
            }
            case STATE.CAN_START: {
                if (this.started) {
                    this.state = STATE.PREPARE
                }
                break
            }
            case STATE.PREPARE: {
                setInterval(() => {
                    this.state = STATE.WAITING_PROMPT
                }, 5000)
                break
            }
            case STATE.WAITING_PROMPT: {
                if (this.prompt.length) {
                    this.state = STATE.WAITING_GUESSES
                }
                break
            }
            case STATE.WAITING_GUESSES: {
                if (this.guesses.size === this.players.size) {
                    this.state = STATE.WAITING_RESULT
                }
                break
            }
            case STATE.WAITING_RESULT: {
                if (this.results.size && this.maxRounds !== this.currentRound) {
                    this.newRound()
                    this.state = STATE.WAITING_PROMPT
                } else {
                    this.state = STATE.ENDING
                }
                break
            }
        }
        this.session.observeGame(this)
    }

    toJSON() {
        return {
            canStart: this.canStart,
            leader: this.leader.client,
            started: this.started,
            players: [...this.players.values()],
            currentRound: this.currentRound,
            maxRounds: this.maxRounds,
            prompt: this.prompt,
            state: this.state,
        }
    }
}