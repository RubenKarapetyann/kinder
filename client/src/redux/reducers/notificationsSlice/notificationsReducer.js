import { LOADING_FINISH, LOADING_START, SET_NOTIFICATIONS_LIST } from "../../../constants/notifications-slice-constants"
import { getList } from "../../../utils/api-helper"


function notificationsReducer(state={ list : [], loading : false }, action){
    switch(action.type){
        case LOADING_START:
            return {
                ...state,
                loading : true
            }
        case LOADING_FINISH:
            return {
                ...state,
                loading : false
        }
        case SET_NOTIFICATIONS_LIST:
            return {
                ...state,
                list : action.payload.list
            }
        default:
            return state
    }
}

export const getNotifications = (navigate)=>{
    return getList(navigate,"notifications","",SET_NOTIFICATIONS_LIST,LOADING_START,LOADING_FINISH)
}


export default notificationsReducer