import { CLEAR_ERROR, ERROR_LOG, LOADING_FINISH, LOADING_START } from "../../../constants/login-slice-constants"
import { HOME } from "../../../constants/routes-constants"
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

export const loginApi = (inputData,navigate)=>{
    return (dispatch)=>{
        try{
            dispatch(loadingStart())
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
                dispatch(loadingFinish())
                if(result.access){
                    navigate("/"+HOME)
                    localStorage.setItem("jwtToken" , result.token)
                }else{
                    dispatch(errorSeter(result.message))
                }
            })
        }catch(err){
            dispatch(loadingFinish())
        }
    }
}

export default loginReducer