import {createSlice} from "@reduxjs/toolkit"
import {ISession, ISessionDefaultValues} from "@/models/ISession";

interface SessionState {
    sessions: ISession[]
    currentSession: ISession
}

const initialState: SessionState = {
    sessions: [],
    currentSession: ISessionDefaultValues
}

export const sessionsSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSessions: (state, action) => {
            state.sessions = action.payload
        },
        setCurrentSession: (state, action) => {
            state.currentSession = action.payload
        }
    }
})

export const sessionReducer = sessionsSlice.reducer
export default sessionReducer