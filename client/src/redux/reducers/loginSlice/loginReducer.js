import { CLEAR_ERROR, ERROR_LOG, LOADING_FINISH, LOADING_START } from "../../../constants/login-slice-constants"
import { HOME } from "../../../constants/routes-constants"
import { loadingFinish, loadingStart } from "../../../utils/api-helper"
import { setUser } from "../userSlice/UserActions"
import { errorSeter } from "./loginActions"

function loginReducer(state={ loading : false, error : { email : false, password : false } },action){
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
                error : {
                    ...state.error,
                    [action.payload.type] : action.payload.text
                }
            }
        case CLEAR_ERROR:
            return{
                ...state,
                error : { email : false, password : false }
            }
        default:
            return state
    }
}

export const loginApi = (inputData,navigate)=>{
    return (dispatch)=>{
        try{
            dispatch(loadingStart(LOADING_START))
            fetch("/login",{
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    email : inputData.email,
                    password : inputData.password,
                    rememberMe : inputData.rememberMe
                })
            }).then((res)=>res.json()).then(result=>{
                dispatch(loadingFinish(LOADING_FINISH))
                if(result.access){
                    navigate("/"+HOME)
                    localStorage.setItem("jwtToken" , result.token)
                    dispatch(setUser(result.user))
                }else{
                    dispatch(errorSeter(result.type,result.message))
                }
            })
        }catch(err){
            dispatch(loadingFinish(LOADING_FINISH))
        }
    }
}

export default loginReducer