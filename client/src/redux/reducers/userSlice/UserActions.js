import { LOG_OUT, SET_USER } from "../../../constants/user-slice-constants"

export const setUser = (name,email,id)=>{
    return {
        type : SET_USER,
        payload : {
            name,
            email,
            id
        }
    }
}

export const logoutUser = ()=>{
    return {
        type : LOG_OUT
    }
}