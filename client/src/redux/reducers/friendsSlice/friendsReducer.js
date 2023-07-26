import { getHeaders } from "../../../constants/api-constants"
import { LOADING_START, LOADING_FINISH, SET_FRIENDS_LIST, DELETE_FRIEND } from "../../../constants/friends-slice-constants"
import { HOME } from "../../../constants/routes-constants"
import { checkToken, getList, loadingFinish, loadingStart } from "../../../utils/api-helper"
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


export const getFriends = (navigate,id="")=>{
    return getList(navigate,"friends",id,SET_FRIENDS_LIST,LOADING_START,LOADING_FINISH)
}

export const deleteFriendById = (navigate,id)=>{
    return (dispatch)=>{
        const func = async token =>{
            try{
                dispatch(loadingStart(LOADING_START))
                const response = await fetch("/friends/"+id,{
                    method : "DELETE",
                    headers : getHeaders(token)
                })
                const result = await response.json()
                if(result.access){
                    dispatch(deleteFriend(id))
                }
                dispatch(loadingFinish(LOADING_FINISH))
            }catch(err){
                dispatch(loadingFinish(LOADING_FINISH))
                navigate("/"+HOME)
            }
        }
        checkToken(func,navigate)
    }
}

export default friendsReducer