import {IUser, IUserDefaultValues} from "@/models/IUser";

export interface IGame {
    canStart: boolean,
    leader: IUser,
    started:boolean,
    players:IUser[]
    currentRound: number,
    maxRounds:number
    prompt:string
    state:string
}

export const IGameDefaultValues:IGame = {
    canStart:false,
    leader:IUserDefaultValues,
    started:false,
    players: [],
    currentRound: 1,
    maxRounds:3,
    prompt:"",
    state:"WAITING"
}