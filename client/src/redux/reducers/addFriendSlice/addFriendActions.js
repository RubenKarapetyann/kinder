import { SET_STATUS } from "../../../constants/add-friend-slice-constants"

export const setStatus = (status,id)=>{
    return {
        type : SET_STATUS,
        payload : {
            status,
            id
        }
    }
}