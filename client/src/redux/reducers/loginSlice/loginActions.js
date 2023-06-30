import { CLEAR_ERROR, ERROR_LOG, LOADING_FINISH, LOADING_START } from "../../../constants/login-slice-constants"

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
export const errorClear = ()=>{
    return {
        type : CLEAR_ERROR
    }
}


export const errorSeter = (error)=>{
    return {
        type : ERROR_LOG,
        payload : {
            text : error
        }
    }
}