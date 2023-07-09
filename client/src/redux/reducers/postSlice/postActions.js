import { SET_POST } from "../../../constants/post-slice-constants"

export const setPost = (post)=>{
    return {
        type : SET_POST,
        payload : {
            post
        }
    }
}