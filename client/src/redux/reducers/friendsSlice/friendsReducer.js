import { getHeaders } from "../../../constants/api-constants"
import { LOADING_START, LOADING_FINISH, SET_FRIENDS_LIST, DELETE_FRIEND } from "../../../constants/friends-slice-constants"
import { getList, listSeter, loadingFinish, loadingStart } from "../../../utils/api-helper"
import { deleteFriend } from "./friendsActions"


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
        case DELETE_FRIEND:
            return {
                ...state,
                list : state.list.filter(item=>item.id!==action.payload.id)
            }
        default:
            return state
    }
}


export const getFriends = (navigate)=>{
    return getList(navigate,"friends","",listSeter,loadingStart,loadingFinish,SET_FRIENDS_LIST,LOADING_START,LOADING_FINISH)
}

export const deleteFriendById = (id)=>{
    console.log(id)

}

export default friendsReducer