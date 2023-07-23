import { PAGE_INCREMENT, POST_ACTIVE, SET_HOME_POSTS } from "../../../constants/home-slice-constants"

export const setHomePosts = (posts)=>{
    return  {
        type : SET_HOME_POSTS,
        payload : {
            posts
        }
    }
}

export const activePostAction = (post)=>{
    return  {
        type : POST_ACTIVE,
        payload : {post}
    }
}

export const pageIncrement = ()=>{
    return {
        type : PAGE_INCREMENT
    }
}