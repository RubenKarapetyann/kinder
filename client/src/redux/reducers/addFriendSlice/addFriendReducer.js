import { LOADING_START, LOADING_FINISH, LIST_SET, SET_STATUS } from "../../../constants/add-friend-slice-constants"
import { getHeaders } from "../../../constants/api-constants"
import { LOGIN } from "../../../constants/routes-constants"
import { getList, loadingFinish, loadingStart } from "../../../utils/api-helper"
import { setStatus } from "./addFriendActions"


function addFriendReducer(state={ loading : false, list : [] },action){
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
        case LIST_SET:
            return {
                ...state,
                list : action.payload.list
            }
        case SET_STATUS:
            return {
                ...state,
                list : state.list.map(user=>user.id === action.payload.id ? (user.status=action.payload.status) && user : user)
            }
        default:
            return state
    }
}


export const activeFriend = (id,status,navigate)=>{
    return (dispatch)=>{
        const token = localStorage.getItem("jwtToken")
        if(token){
            try{
                loadingStart(LOADING_START)
                fetch("/addfriend",{
                    method : "POST",
                    headers : getHeaders(token),
                    body : JSON.stringify({
                        id,
                        status
                    })
                }).then(response=>response.json()).then(res=>{
                    dispatch(setStatus(res.status,res.id))
                    loadingFinish(LOADING_FINISH)
                })
            }catch(err){
                loadingFinish(LOADING_FINISH)
                console.log(err);
            }
        }else{
            navigate("/"+LOGIN)
        }
    }
}

export const getAddFriends = (navigate,id="")=>{
    return getList(navigate,"addfriend",id,LIST_SET,LOADING_START,LOADING_FINISH)
}

export default addFriendReducer