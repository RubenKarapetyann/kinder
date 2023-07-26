import { getHeaders } from "../../../constants/api-constants"
import { LOGIN } from "../../../constants/routes-constants"
import { LOG_OUT, SET_USER } from "../../../constants/user-slice-constants"
import { checkToken } from "../../../utils/api-helper"
import { logoutUser, setUser } from "./UserActions"

function userReducer(state={user : {isAuth : false}}, action){
    switch(action.type){
        case SET_USER:
            return {
                ...state,
                user : {
                    ...action.payload.user
                }
            }
        case LOG_OUT:
            return {
                ...state,
                user : {
                    isAuth : false
                }
            }
        default:
            return state
    }
}

export const checkAuthentication = (navigate)=>{
    return (dispatch)=>{
        const func = async token =>{
            try{
                const response = await fetch("/auth",{
                    headers : getHeaders(token)
                })
                const result = await response.json()
                dispatch(setUser(result))
            }catch(err){
                console.log(err);
            }
        }
        checkToken(func,navigate)
    }
}

export const userLogout = (navigate)=> {
    return (dispatch)=>{
        const func = async token =>{
            try{
                const response = await fetch("/logout",{
                    headers : getHeaders(token)
                })
                const result = await response.json()
                if(result.access){
                    localStorage.setItem("jwtToken", null)
                    dispatch(logoutUser())
                    navigate("/"+LOGIN)
                }
            }catch(err){
                console.log(err);
            }
        }
        checkToken(func,navigate)
    }
}

export default userReducer