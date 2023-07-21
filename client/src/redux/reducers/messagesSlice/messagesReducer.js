import { LOADING_FINISH, LOADING_START, SET_MESSAGES_LIST } from "../../../constants/messages-slice-constants"
import { getList } from "../../../utils/api-helper"


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
                messages : action.payload.list
            }
        default:
            return state
    }
}

export const getMessagesList = (navigate,id="")=>{
    return getList(navigate,"messages",id,SET_MESSAGES_LIST,LOADING_START,LOADING_FINISH)
}




export default messagesReducer