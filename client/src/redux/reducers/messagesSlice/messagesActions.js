import { LOADING_START, LOADING_FINISH } from "../../../constants/messages-slice-constants"

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