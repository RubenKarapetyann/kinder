import { LOGIN } from "../../../constants/routes-constants"
import { LOADING_FINISH, LOADING_START } from "../../../constants/settings-slice-constants"
import { loadingFinish, loadingStart } from "../../../utils/api-helper"
import { setUser } from "../userSlice/UserActions"

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

export const changeSettings = (navigate,formData)=>{
    return (dispatch)=>{
        const token = localStorage.getItem("jwtToken")
        if(token){
            try{
                dispatch(loadingStart(LOADING_START))
                fetch("/settings",{
                    method : "POST",
                    headers : {
                        "authorization" : "Bearer "+token
                    },
                    body : formData
                }).then(res=>res.json()).then(result=>{
                    if(result.access){
                        dispatch(setUser(result.user))
                        navigate(-1)
                    }
                    dispatch(loadingFinish(LOADING_FINISH))
                })
            }catch(err){
                dispatch(loadingFinish(LOADING_FINISH))
                navigate(-1)
            }
        }else{
            navigate("/"+LOGIN)
        }
    }
}


export default settingsReducer