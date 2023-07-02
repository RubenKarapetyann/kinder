import { LOADING_FINISH, LOADING_START, POST_ACTIVE, POST_LIKE, SET_HOME_POSTS } from "../../../constants/home-slice-constants"

export const loadingStart = ()=>{
    return {
        type : LOADING_START
    }
}

export const loadingFinish = ()=>{
    return {
        type : LOADING_FINISH
    }
}

export const setHomePosts = (posts)=>{
    return  {
        type : SET_HOME_POSTS,
        payload : {
            posts
        }
    }
}

export const activePostAction = (type,postId)=>{
    return  {
        type : POST_ACTIVE,
        payload : {type,postId}
    }
}