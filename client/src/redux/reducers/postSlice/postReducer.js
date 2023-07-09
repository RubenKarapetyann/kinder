import { getHeaders } from "../../../constants/api-constants"
import { LOADING_FINISH, LOADING_START } from "../../../constants/post-slice-constants"
import { HOME, LOGIN } from "../../../constants/routes-constants"
import { loadingFinish, loadingStart } from "../../../utils/api-helper"

function postReducer(state={ loading : false, post : {} },action){
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