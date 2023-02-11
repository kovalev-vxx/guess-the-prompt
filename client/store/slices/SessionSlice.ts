import {createSlice} from "@reduxjs/toolkit"
import {ISession} from "@/models/ISession";

interface SessionState {
    sessions: ISession[]
}

const initialState: SessionState = {
    sessions: []
}

export const sessionsSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSessions: (state,action ) => {
            state.sessions = action.payload
        }
    }
})

export const sessionReducer = sessionsSlice.reducer
export default sessionReducer