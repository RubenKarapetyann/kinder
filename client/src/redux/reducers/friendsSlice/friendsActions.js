import { DELETE_FRIEND } from "../../../constants/friends-slice-constants"

export const deleteFriend = (id)=>{
    return { 
        type : DELETE_FRIEND,
        payload : {
            id 
        }
    }
}