import { LOADING_FINISH, LOADING_START } from "../../../constants/comments-slice-constants"

function commentsReducer(state={ loading : false, comments : [] },action){
    switch (action.type){
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


export default commentsReducer