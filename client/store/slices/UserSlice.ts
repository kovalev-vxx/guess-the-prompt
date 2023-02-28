import {createSlice} from "@reduxjs/toolkit"
import {IUser} from "@/models/IUser";
import {HYDRATE} from "next-redux-wrapper";

interface SessionState {
    user: IUser
}

const initialState: SessionState = {
    user: {username: "", id: ""}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state,action ) => {
            state.user = action.payload
        }
    },
    // extraReducers: {
    //     [HYDRATE]: (state,action) => {
    //
    //     }
    // }
})

export const userReducer = userSlice.reducer
export default userReducer