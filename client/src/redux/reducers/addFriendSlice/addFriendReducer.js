import { LOADING_START, LOADING_FINISH } from "../../../constants/add-friend-slice-constants"


function addFriendReducer(state={ loading : false, list : [] },action){
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
        default:
            return state
    }
}

export default addFriendReducer