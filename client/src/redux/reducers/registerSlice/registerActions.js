import { CLEAR_ERROR, ERROR_REG, LOADING_FINISH, LOADING_START } from "../../../constants/register-slice-constants"

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
        type : ERROR_REG,
        payload : {
            text : error
        }
    }
}