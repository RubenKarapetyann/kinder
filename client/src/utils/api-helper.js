import { getHeaders } from "../constants/api-constants"
import { HOME, LOGIN } from "../constants/routes-constants"

export const getToken = ()=>localStorage.getItem("jwtToken")
    

export const getList = (navigate,route,id,listSeter,loadingStart,loadingFinish)=>{
    return (dispatch)=>{
        const token = localStorage.getItem("jwtToken")
        if(token){
            dispatch(loadingStart())
            try{
                fetch(`/${route}/`+id,{
                    method : "GET",
                    headers : getHeaders(token)
                }).then(res=>res.json()).then(result=>{
                    if(result.access){
                        dispatch(listSeter(result.list))
                    }
                    dispatch(loadingFinish())
                })
            }catch(err){
                navigate("/"+HOME)
            }
        }else{
            navigate("/"+LOGIN)
        }
    }
}


export const loadingStart = (LOADING_START)=>{
    return {
        type : LOADING_START
    }
}

export const loadingFinish = (LOADING_FINISH)=>{
    return {
        type : LOADING_FINISH
    }
}