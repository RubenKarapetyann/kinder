import { ADD_MESSAGE } from "../../../constants/chat-slice-constants"

export const addMessage = (message)=>{
    return {
        type : ADD_MESSAGE,
        payload : {
            message : {...message}
        }
    }
}