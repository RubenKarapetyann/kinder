import { LOADING_START, LOADING_FINISH } from "../../../constants/register-slice-constants"
import { loadingFinish, loadingStart } from "./registerActions"

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
        default:
            return state
    }
}


export const registerApi = (inputData)=>{
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
                console.log(result);
              })
        }catch(err){
            dispatch(loadingFinish())
        }
    }
}


export default registerReducer