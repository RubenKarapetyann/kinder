import { SET_USER } from "../../../constants/user-slice-constants"

function userReducer(state={user : {isAuth : false}}, action){
    switch(action.type){
        case SET_USER:
            return {
                ...state,
                user : {
                    isAuth : true,
                    name : action.payload.name,
                    email : action.payload.email,
                    id : action.payload.id
                }
            }
        default:
            return state
    }
}

export default userReducer