import {Action, combineReducers, configureStore, ThunkAction} from "@reduxjs/toolkit";
import sessionReducer from "@/store/slices/SessionSlice";
import userReducer from "./slices/UserSlice";
import {createWrapper} from "next-redux-wrapper";

const rootReducer = combineReducers({
    session: sessionReducer,
    user: userReducer
})

export const setupStore = () => {
    return configureStore({
        reducer:rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(setupStore);