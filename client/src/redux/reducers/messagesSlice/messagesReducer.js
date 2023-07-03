import { LOADING_FINISH, LOADING_START } from "../../../constants/messages-slice-constants"

function messagesReducer(state={ messages : [], loading : false }, action){
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

export const getMessagesList = ()=>{
    return (dispatch)=>{
        try{

        }catch(err){

        }
    }
}

export default messagesReducer