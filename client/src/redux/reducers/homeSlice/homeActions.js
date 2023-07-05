import { POST_ACTIVE, POST_LIKE, SET_HOME_POSTS } from "../../../constants/home-slice-constants"

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