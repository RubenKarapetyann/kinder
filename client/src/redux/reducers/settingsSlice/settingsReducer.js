import { LOADING_FINISH, LOADING_START } from "../../../constants/settings-slice-constants"

function settingsReducer(state={ loading : false },action){
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

export default settingsReducer