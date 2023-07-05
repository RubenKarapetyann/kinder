import { SET_NEW_COMMENT } from "../../../constants/comments-slice-constants"


export const setNewComment = (comment)=>{
    return {
        type : SET_NEW_COMMENT,
        payload : {
            comment
        }
    }
}