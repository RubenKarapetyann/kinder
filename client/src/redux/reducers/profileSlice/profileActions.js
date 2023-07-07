import { SET_PROFILE } from "../../../constants/profile-slice-constants"

export const setProfile =(profile)=>{
    return {
        type : SET_PROFILE,
        payload : {
            profile
        }
    }
}