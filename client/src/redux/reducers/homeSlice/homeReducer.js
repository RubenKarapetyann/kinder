import { LOADING_FINISH, LOADING_START, POST_ACTIVE, SET_HOME_POSTS } from "../../../constants/home-slice-constants"
import { HOME, LOGIN } from "../../../constants/routes-constants"
import { loadingFinish, loadingStart, setHomePosts, activePostAction } from "./homeActions"

function homeReducer(state={ loading : false, posts : [] },action){
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
        case POST_ACTIVE:
            if(action.payload.type === "like"){
                const newPosts = state.posts.map(val=>{
                    if(val.postId === action.payload.id){
                        val.liked = !val.liked
                        val.likes = !val.liked ? --val.likes : ++val.likes
                    }
                    return val
                })
                return {
                    ...state,
                    posts : newPosts
                } 
            }
            return state          
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

export const activePost = (navigate,postId,type)=>{
    return (dispatch)=>{
        const token = localStorage.getItem("jwtToken")
        if(token){
            try{
                // dispatch(loadingStart())
                fetch("/home",{
                    method : 'POST',
                    headers : {
                        'Content-Type': 'application/json',
                        "authorization" : "Bearer "+token
                    },
                    body : JSON.stringify({
                        postId,
                        type
                    })
                }).then((res)=>res.json()).then(result=>{
                    // dispatch(loadingFinish())
                    if(result.access){
                        dispatch(activePostAction(type,postId))
                    }
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