import {IUser} from "@/models/IUser";

export interface ISession {
    id: number,
    clients: number
    owner: IUser
}