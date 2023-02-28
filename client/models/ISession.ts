import {IUser, IUserDefaultValues} from "@/models/IUser";

export interface ISession {
    id: number,
    clients_count: number
    owner: IUser
    clients:IUser[]
}

export const ISessionDefaultValues:ISession = {
    id: -1, clients_count: 0, owner:IUserDefaultValues, clients:[]
}