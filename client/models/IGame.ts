import {IUser, IUserDefaultValues} from "@/models/IUser";

export interface IGame {
    canStart: boolean,
    leader: IUser
}

export const IGameDefaultValues:IGame = {
    canStart:false,
    leader:IUserDefaultValues
}