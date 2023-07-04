import { LOADING_FINISH, LOADING_START, SET_COMMENTS_LIST } from "../../../constants/comments-slice-constants"
import { HOME, LOGIN } from "../../../constants/routes-constants"
import { loadingFinish, loadingStart, setCommentsList } from "./commentsActions"

function commentsReducer(state={ loading : false, comments : [] },action){
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
                comments : action.payload.commentsList
            }   
        default:
            return state
    }
}

export const getCommentsList = (navigate,postId)=>{
    return (dispatch)=>{
        const token = localStorage.getItem("jwtToken")
        if(token){
            dispatch(loadingStart())
            try{
                fetch("/comments/"+postId,{
                    method : "GET",
                    headers : {
                        'Content-Type': 'application/json',
                        "authorization" : "Bearer "+token
                    }
                }).then(res=>res.json()).then(result=>{
                    if(result.access){
                        dispatch(setCommentsList(result.commentsList))
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

export const sendComment = (navigate,comment,postId)=>{
    return (dispatch)=>{
        const token = localStorage.getItem("jwtToken")
        if(token){
            dispatch(loadingStart())
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
                        // dispatch(setCommentsList(result.commentsList))
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


export default commentsReducer