import {ISession} from "@/models/ISession";
import {AppDispatch} from "@/store";
import {sessionsSlice} from "@/store/slices/SessionSlice";

export const setSessions = (sessions:ISession[]) => {
    return async (dispatch:AppDispatch) => {
        dispatch(sessionsSlice.actions.setSessions(sessions))
    }
}