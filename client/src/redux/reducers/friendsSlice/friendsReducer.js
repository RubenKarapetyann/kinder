import { LOADING_START, LOADING_FINISH, SET_FRIENDS_LIST } from "../../../constants/friends-slice-constants"
import { getList, listSeter, loadingFinish, loadingStart } from "../../../utils/api-helper"


function friendsReducer(state={ loading : false, list : [] },action){
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
        case SET_FRIENDS_LIST:
            return {
                ...state,
                list : action.payload.list
            }
        default:
            return state
    }
}


export const getFriends = (navigate)=>{
    return getList(navigate,"friends","",listSeter,loadingStart,loadingFinish,SET_FRIENDS_LIST,LOADING_START,LOADING_FINISH)
}



export default friendsReducer