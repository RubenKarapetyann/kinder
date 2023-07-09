import { LOADING_FINISH, LOADING_START } from "../../../constants/post-slice-constants"

function postReducer(state={ loading : false, post : {} },action){
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

export default postReducer