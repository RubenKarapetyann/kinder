import { getHeaders } from "../../../constants/api-constants"
import { LOADING_FINISH, LOADING_START, SET_POST } from "../../../constants/post-slice-constants"
import { HOME } from "../../../constants/routes-constants"
import { checkToken, loadingFinish, loadingStart } from "../../../utils/api-helper"
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
    return async (dispatch)=>{
        const func = async token =>{
            try{
                dispatch(loadingStart(LOADING_START))
                const response = await fetch("/post/"+id,{
                    headers : getHeaders(token)
                })
                const result = await response.json()
                if(result.access){
                    dispatch(setPost(result.post))
                }
                dispatch(loadingFinish(LOADING_FINISH))
            }catch(err){
                navigate("/"+HOME)
                dispatch(loadingFinish(LOADING_FINISH))
            }
        }
        await checkToken(func,navigate)
    }
}

export default postReducer