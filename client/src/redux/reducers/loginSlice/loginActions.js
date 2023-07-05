import { CLEAR_ERROR, ERROR_LOG } from "../../../constants/login-slice-constants"

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