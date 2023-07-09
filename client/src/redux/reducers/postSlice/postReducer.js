import { getHeaders } from "../../../constants/api-constants"
import { LOADING_FINISH, LOADING_START, SET_POST } from "../../../constants/post-slice-constants"
import { HOME, LOGIN } from "../../../constants/routes-constants"
import { loadingFinish, loadingStart } from "../../../utils/api-helper"
import { setPost } from "./postActions"

function postReducer(state={ loading : false, post : { auther : {} } },action){
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
        case SET_POST:
            return {
                ...state,
                post : action.payload.post
            }
        default:
            return state
    }
}

export const getPost =(navigate,id)=>{
    return (dispatch)=>{
        const token = localStorage.getItem("jwtToken")
        if(token){
            dispatch(loadingStart(LOADING_START))
            try{
                fetch("/post/"+id,{
                    method : "GET",
                    headers : getHeaders(token)
                }).then(res=>res.json()).then(result=>{
                    if(result.access){
                        dispatch(setPost(result.post))
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

export default postReducer