import { LOADING_FINISH, LOADING_START } from "../../../constants/home-slice-constants"
import { HOME, LOGIN } from "../../../constants/routes-constants"
import { loadingFinish, loadingStart } from "./homeActions"

function homeReducer(state={ loading : false, posts : null },action){
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

export const getHomePosts = (navigate)=>{
    const token = localStorage.getItem("jwtToken")
    return (dispatch)=>{
        if(token){
            try{
                dispatch(loadingStart())
                fetch("/home",{
                    method : 'GET',
                    headers : {
                        'Content-Type': 'application/json',
                        "authorization" : "Barrer "+token
                    },
                }).then((res)=>res.json()).then(result=>{
                    dispatch(loadingFinish())
                    if(result.access){
                        navigate("/"+HOME)
                    }else{
                        navigate("/"+LOGIN)
                    }
                })
            }catch(err){
                navigate("/"+HOME)
            }
        }else{
            navigate("/"+HOME)
        }
    }
}


export default homeReducer