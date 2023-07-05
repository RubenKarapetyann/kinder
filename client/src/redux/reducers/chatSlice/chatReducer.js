import { LOADING_START , LOADING_FINISH, SET_CHAT_LIST} from "../../../constants/chat-slice-constants"
import { getList, listSeter, loadingFinish, loadingStart } from "../../../utils/api-helper"


function chatReducer(state={ loading : false, list : [] },action){
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
        case SET_CHAT_LIST:
            return {
                ...state,
                list : action.payload.list
            }
        default:
            return state
    }
}

export const getChatList = (navigate,id)=>{
    return getList(navigate,"chat",id,listSeter,loadingStart,loadingFinish,SET_CHAT_LIST,LOADING_START,LOADING_FINISH)
}



export default chatReducer