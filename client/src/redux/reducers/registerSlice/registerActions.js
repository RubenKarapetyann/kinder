import { CLEAR_ERROR, ERROR_REG } from "../../../constants/register-slice-constants"


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