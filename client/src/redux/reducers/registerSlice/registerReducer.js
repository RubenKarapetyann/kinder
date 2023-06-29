import { LOADING_START, LOADING_FINISH } from "../../../constants/register-slice-constants"

function registerReducer(state={ loading : false, error : false },action){
    switch (action.type){
        case LOADING_START:
            return state
        case LOADING_FINISH:
            return state
        default:
            return state
    }
}


export default registerReducer