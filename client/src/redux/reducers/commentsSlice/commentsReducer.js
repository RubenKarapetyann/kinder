import { LOADING_FINISH, LOADING_START, SET_COMMENTS_LIST, SET_NEW_COMMENT } from "../../../constants/comments-slice-constants"
import { HOME, LOGIN } from "../../../constants/routes-constants"
import { getList, getToken, listSeter, loadingFinish, loadingStart } from "../../../utils/api-helper"
import { setNewComment } from "./commentsActions"

function commentsReducer(state={ loading : false, list : [] },action){
    switch (action.type){
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
        case SET_COMMENTS_LIST:
            return {
                ...state,
                list : action.payload.list
            } 
        case SET_NEW_COMMENT:
            return {
                ...state,
                list : [...state.list,action.payload.comment]
            }   
        default:
            return state
    }
}

export const getCommentsList = (navigate,id)=>{
    return getList(navigate,"comments",id,listSeter,loadingStart,loadingFinish,SET_COMMENTS_LIST,LOADING_START,LOADING_FINISH)
}

export const sendComment = (navigate,comment,postId)=>{
    return (dispatch)=>{
        const token = localStorage.getItem("jwtToken")
        if(token){
            dispatch(loadingStart(LOADING_START))
            try{
                fetch("/comments",{
                    method : "POST",
                    headers : {
                        'Content-Type': 'application/json',
                        "authorization" : "Bearer "+token
                    },
                    body : JSON.stringify({
                        comment,
                        postId
                    })
                }).then(res=>res.json()).then(result=>{
                    if(result.access){
                        dispatch(setNewComment(result.comment))
                    }
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


export default commentsReducer