import { getHeaders } from "../../../constants/api-constants"
import { LOADING_FINISH, LOADING_START, SET_COMMENTS_LIST, SET_NEW_COMMENT } from "../../../constants/comments-slice-constants"
import { HOME, LOGIN } from "../../../constants/routes-constants"
import { checkToken, getList, loadingFinish, loadingStart } from "../../../utils/api-helper"
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
    return getList(navigate,"comments",id,SET_COMMENTS_LIST,LOADING_START,LOADING_FINISH)
}

export const sendComment = (navigate,comment,postId)=>{
    return (dispatch)=>{
        const func = async token =>{
            try{
                dispatch(loadingStart(LOADING_START))
                const response = await fetch("/comments",{
                    method : "POST",
                    headers : getHeaders(token),
                    body : JSON.stringify({
                        comment,
                        postId
                    })
                })
                const result = await response.json()
                if(result.access){
                    dispatch(setNewComment(result.comment))
                }
                dispatch(loadingFinish(LOADING_FINISH))
            }catch(err){
                navigate("/"+HOME)
                dispatch(loadingFinish(LOADING_FINISH))
            }
        }
        checkToken(func,navigate)
    }
}


export default commentsReducer