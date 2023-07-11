import { getHeaders } from "../../../constants/api-constants"
import { SET_USER } from "../../../constants/user-slice-constants"
import { setUser } from "./UserActions"

function userReducer(state={user : {isAuth : false}}, action){
    switch(action.type){
        case SET_USER:
            return {
                ...state,
                user : {
                    isAuth : true,
                    name : action.payload.name,
                    email : action.payload.email,
                    id : action.payload.id
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
                dispatch(setUser(result.name,result.email,result.id))
            })
        }catch(err){
            console.log(err);
        }
    }
}

export default userReducer