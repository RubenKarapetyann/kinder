import { LOADING_START, LOADING_FINISH, SET_COMMENTS_LIST, SET_NEW_COMMENT } from "../../../constants/comments-slice-constants"

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


export const setNewComment = (comment)=>{
    return {
        type : SET_NEW_COMMENT,
        payload : {
            comment
        }
    }
}