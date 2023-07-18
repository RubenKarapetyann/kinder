import { LOG_OUT, SET_USER } from "../../../constants/user-slice-constants"

export const setUser = (user)=>{
    return {
        type : SET_USER,
        payload : {
            user
        }
    }
}

export const logoutUser = ()=>{
    return {
        type : LOG_OUT
    }
}