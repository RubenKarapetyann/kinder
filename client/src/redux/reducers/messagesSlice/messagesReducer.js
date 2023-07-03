import { LOADING_FINISH, LOADING_START, SET_MESSAGES_LIST } from "../../../constants/messages-slice-constants"
import { loadingFinish, loadingStart, setMessagesList } from "./messagesActions"
import { HOME, LOGIN } from "../../../constants/routes-constants"
function messagesReducer(state={ messages : [], loading : false }, action){
    switch(action.type){
        case LOADING_START:
            return {
                ...state,
                loading : true
            }
        case LOADING_FINISH:
            return {
                ...state,
                loading : false
        }
        case SET_MESSAGES_LIST:
            return {
                ...state,
                messages : action.payload.messagesList
            }
        default:
            return state
    }
}

export const getMessagesList = (navigate)=>{
    return (dispatch)=>{
        const token = localStorage.getItem("jwtToken")
        if(token){
            dispatch(loadingStart())
            try{
                fetch("/messages",{
                    method : "GET",
                    headers : {
                        'Content-Type': 'application/json',
                        "authorization" : "Bearer "+token
                    }
                }).then(res=>res.json()).then(result=>{
                    if(result.access){
                        dispatch(setMessagesList(result.messagesList))
                    }
                    dispatch(loadingFinish())
                })
            }catch(err){
                navigate("/"+HOME)
            }
        }else{
            navigate("/"+LOGIN)
        }
    }
}



export default messagesReducer