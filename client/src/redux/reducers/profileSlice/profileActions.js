import { SET_PROFILE, TAB_CHANGE } from "../../../constants/profile-slice-constants"

export const setProfile =(profile)=>{
    return {
        type : SET_PROFILE,
        payload : {
            profile
        }
    }
}

export const tabChange = (activeTab)=>{
    return {
        type : TAB_CHANGE,
        payload : {
            activeTab
        }
    }
}
