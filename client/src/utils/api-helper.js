import { getHeaders } from "../constants/api-constants"
import { HOME, LOGIN } from "../constants/routes-constants"

export const getToken = ()=>localStorage.getItem("jwtToken")
    
export const getList = (navigate,route,id,LIST_SET,LOADING_START,LOADING_FINISH)=>{
    return (dispatch)=>{
        const token = localStorage.getItem("jwtToken")
        if(token){
            dispatch(loadingStart(LOADING_START))
            try{
                fetch(`/${route}/`+id,{
                    method : "GET",
                    headers : getHeaders(token)
                }).then(res=>res.json()).then(result=>{
                    if(result.access){
                        dispatch(listSeter(LIST_SET,result.list))
                    }
                    dispatch(loadingFinish(LOADING_FINISH))
                })
            }catch(err){
                navigate("/"+HOME)
                dispatch(loadingFinish(LOADING_FINISH))
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

export const listSeter = (type,list)=>{
    return {
        type,
        payload : {
            list
        }
    }
}

export const checkToken = (func,navigate)=>{
    const token = getToken()
    if(token){
        func(token)
    }else{
        navigate("/"+LOGIN)
    }
}