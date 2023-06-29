import { LOADING_START, LOADING_FINISH, ERROR_REG, CLEAR_ERROR } from "../../../constants/register-slice-constants"
import { errorSeter, loadingFinish, loadingStart } from "./registerActions"

function registerReducer(state={ loading : false, error : false },action){
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
        case ERROR_REG:
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


export const registerApi = (inputData,navigate)=>{
    return (dispatch)=>{
        try{
            dispatch(loadingStart())
            fetch("/register", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name : inputData.name,
                    email : inputData.email,
                    password : inputData.password
                })
              }).then(res=>res.json()).then(result=>{
                dispatch(loadingFinish())
                if(result.access){
                    navigate("/login")
                }else{
                    dispatch(errorSeter(result.message))
                }
              })
        }catch(err){
            dispatch(loadingFinish())
        }
    }
}


export default registerReducer