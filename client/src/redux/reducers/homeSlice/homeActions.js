import { LOADING_FINISH, LOADING_START, SET_HOME_POSTS } from "../../../constants/home-slice-constants"

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