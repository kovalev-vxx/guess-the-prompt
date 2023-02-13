import {IGame} from "@/models/IGame";
import {AppDispatch} from "@/store";
import {gameSlice} from "@/store/slices/GameSlice";

export const updateGame = (game:IGame) => {
    return async (dispatch:AppDispatch) => {
        dispatch(gameSlice.actions.updateGame(game))
    }
}