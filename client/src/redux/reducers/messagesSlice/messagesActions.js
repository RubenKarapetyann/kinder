import { SET_MESSAGES_LIST } from "../../../constants/messages-slice-constants"


export const setMessagesList = (messagesList)=>{
    return {
        type : SET_MESSAGES_LIST,
        payload : {
            messagesList
        }
    }
}