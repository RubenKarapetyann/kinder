import { getHeaders } from "../../../constants/api-constants"
import { LOADING_START, LOADING_FINISH, SET_FRIENDS_LIST, DELETE_FRIEND } from "../../../constants/friends-slice-constants"
import { HOME, LOGIN } from "../../../constants/routes-constants"
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

export const deleteFriendById = (navigate,id)=>{
    return (dispatch)=>{
        const token = localStorage.getItem("jwtToken")
        if(token){
            dispatch(loadingStart(LOADING_START))
            try{
                fetch("/friends/"+id,{
                    method : "DELETE",
                    headers : getHeaders(token)
                }).then(res=>res.json()).then(result=>{
                    // if(result.access){
                    // }
                    dispatch(loadingFinish(LOADING_FINISH))
                })
            }catch(err){
                navigate("/"+HOME)
            }
        }else{
            navigate("/"+LOGIN)
        }
    }
}

export default friendsReducer