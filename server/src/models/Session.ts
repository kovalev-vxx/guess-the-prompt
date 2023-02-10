import {Game} from "./Game";
import {Application} from "express-ws";
import {Socket} from "socket.io"

export class Session {
    id:number;
    // ws:WebSocket
    socket: Socket
    owner: string


    constructor(id:number, socket:Socket) {
        this.id = id
        this.owner = socket.id
        this.socket = socket;
        this.socket.emit("room-created", {id:this.id})
    }

    up(){

    }

    close(){
        console.log(`session ${this.id} closed`)
    }

    toJSON(){
        return {
            id:this.id,
            owner:this.owner
        }
    }
}