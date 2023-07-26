import { getHeaders } from "../../../constants/api-constants"
import { LOADING_FINISH, LOADING_START, PAGE_INCREMENT, POST_ACTIVE, SET_HOME_POSTS } from "../../../constants/home-slice-constants"
import { HOME, LOGIN } from "../../../constants/routes-constants"
import { checkToken, loadingFinish, loadingStart } from "../../../utils/api-helper"
import { setPost } from "../postSlice/postActions"
import { setHomePosts, activePostAction } from "./homeActions"

function homeReducer(state={ loading : false, posts : [], page : 0 },action){
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
                posts : [...state.posts,...action.payload.posts]
            }
        case PAGE_INCREMENT:
            return {
                ...state,
                page : ++state.page
            }
        case POST_ACTIVE:
            return {
                ...state,
                posts : state.posts.map(post=>post.id===action.payload.post.id ? action.payload.post : post)
            }
            // second way
            // if(action.payload.type === "like"){
            //     const newPosts = state.posts.map(val=>{
            //         if(val.id === action.payload.postId){
            //             val.liked = !val.liked
            //             val.likes = !val.liked ? --val.likes : ++val.likes
            //         }
            //         return val
            //     })
            //     return {
            //         ...state,
            //         posts : newPosts
            //     } 
            // }else{
            //     const newPosts = state.posts.map(val=>{
            //         if(val.id === action.payload.postId){
            //             val.favorite = !val.favorite
            //         }
            //         return val
            //     })
            //     return {
            //         ...state,
            //         posts : newPosts
            //     }
            // }          
        default:
            return state
    }
}

export const getHomePosts = (navigate,page)=>{
    return (dispatch)=>{
        const func = async (token)=>{
            try{
                dispatch(loadingStart(LOADING_START))
                const response = await fetch("/home?page="+page,{
                    headers : getHeaders(token)
                })
                const result = await response.json()
                dispatch(loadingFinish(LOADING_FINISH))
                dispatch(setHomePosts(result.posts))
            }catch(err){
                navigate("/"+HOME)
            }
        }
        checkToken(func,navigate)
    }
}

export const activePost = (navigate,postId,type,isSingle)=>{
    return (dispatch)=>{
        const token = localStorage.getItem("jwtToken")
        if(token){
            try{
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
                    if(result.access){
                        if(isSingle){
                            dispatch(setPost(result.post))
                        }else{
                            dispatch(activePostAction(result.post))
                        }
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