import { CLEAR_ERROR, ERROR_LOG, LOADING_FINISH, LOADING_START } from "../../../constants/login-slice-constants"
import { errorSeter, loadingFinish, loadingStart } from "./loginActions"

function loginReducer(state={ loading : false, error : false },action){
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
        case ERROR_LOG:
            return {
                ...state,
                error : action.payload.text
            }
        case CLEAR_ERROR:
            return{
                ...state,
                error : false
            }
        default:
            return state
    }
}

export default loginReducer