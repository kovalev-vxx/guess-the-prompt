import {AppDispatch} from "@/store";
import {userSlice} from "@/store/slices/UserSlice";
import {IUser} from "@/models/IUser";

export const setUser = (user:IUser) => {
    return async (dispatch:AppDispatch) => {
        dispatch(userSlice.actions.setUser(user))
    }
}