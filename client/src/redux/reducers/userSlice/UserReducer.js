import { getHeaders } from "../../../constants/api-constants"
import { LOGIN } from "../../../constants/routes-constants"
import { LOG_OUT, SET_USER } from "../../../constants/user-slice-constants"
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

export const checkAuthentication = ()=>{
    return (dispatch)=>{
        const token = localStorage.getItem("jwtToken")
        try{
            fetch("/auth",{
                headers : getHeaders(token)
            }).then(res=>res.json()).then(result=>{
                dispatch(setUser(result))
            })
        }catch(err){
            console.log(err);
        }
    }
}

export const userLogout = (navigate)=> {
    return (dispatch)=>{
        const token = localStorage.getItem("jwtToken")
        try{
            fetch("/logout",{
                headers : getHeaders(token)
            }).then(res=>res.json()).then(result=>{
                if(result.access){
                    localStorage.setItem("jwtToken", null)
                    dispatch(logoutUser())
                    navigate("/"+LOGIN)
                }
            })
        }catch(err){
            console.log(err);
        }
    }
}

export default userReducer