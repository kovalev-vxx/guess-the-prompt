import {Player} from "./Player";
import {Socket} from "socket.io";
import {Client} from "./Client";
import {Session} from "./Session";

enum STATE {
    WAITING,
    IN_GAME,
    ENDING
}

export class Game {
    state:STATE
    players: Map<string, Player>

    session: Session
    canStart:boolean
    leader?:Player


    constructor(session:Session) {
        this.state = STATE.WAITING;
        this.players = new Map([])
        this.session = session
        this.canStart = false
    }

    addPlayer(player:Player){
        this.players.set(player.client.id, player)
    }

    removePlayer(player:Player){
        this.players.delete(player.client.id)
    }

    canStartCheck(){
        if(this.players.size>=2){
            this.canStart = true
        }
    }



    update(){
        this.canStartCheck()
        this.players.forEach((player:Player)=>{
            player.client.socket.emit("game", this)
        })
    }

    toJSON(){
        let leader:Client| any
        if(this.leader) {
            leader = this.leader.client
        } else {
            leader = {username: "undefined", id: "-1"}
        }

        return {
            canStart:this.canStart,
            leader: leader
        }
    }


}