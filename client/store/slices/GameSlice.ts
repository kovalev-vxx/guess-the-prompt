import {IGame, IGameDefaultValues} from "@/models/IGame"
import {IUser, IUserDefaultValues} from "@/models/IUser"
import { createSlice } from "@reduxjs/toolkit"

interface GameState {
    game: IGame
}

const initialState: GameState = {
    game: IGameDefaultValues
}

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        updateGame:(state,action)=>{
            state.game = action.payload
        }
    }
})

export const gameReducer = gameSlice.reducer
export default gameReducer