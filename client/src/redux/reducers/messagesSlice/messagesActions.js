import { LOADING_START, LOADING_FINISH, SET_MESSAGES_LIST } from "../../../constants/messages-slice-constants"

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


export const setMessagesList = (messagesList)=>{
    return {
        type : SET_MESSAGES_LIST,
        payload : {
            messagesList
        }
    }
}