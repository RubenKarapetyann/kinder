import { LOADING_FINISH, LOADING_START, SET_HOME_POSTS } from "../../../constants/home-slice-constants"
import { HOME, LOGIN } from "../../../constants/routes-constants"
import { loadingFinish, loadingStart, setHomePosts } from "./homeActions"

function homeReducer(state={ loading : false, posts : null },action){
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
        case SET_HOME_POSTS:
            return {
                ...state,
                posts : action.payload.posts
            }
        default:
            return state
    }
}

export const getHomePosts = (navigate)=>{
    return (dispatch)=>{
        const token = localStorage.getItem("jwtToken")
        if(token){
            try{
                dispatch(loadingStart())
                fetch("/home",{
                    method : 'GET',
                    headers : {
                        'Content-Type': 'application/json',
                        "authorization" : "Bearer "+token
                    },
                }).then((res)=>res.json()).then(result=>{
                    dispatch(loadingFinish())
                    dispatch(setHomePosts(result.posts))
                })
            }catch(err){
                navigate("/"+HOME)
            }
        }else{
            navigate("/"+LOGIN)
        }
    }
}


export default homeReducer