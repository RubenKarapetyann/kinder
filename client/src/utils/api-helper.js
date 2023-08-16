import { getHeaders } from "../constants/api-constants"
import { HOME, LOGIN } from "../constants/routes-constants"
import { isTokenExpired } from "./time-helper"

// let isFetching = false
export const getToken = async ()=>{
    const token = localStorage.getItem("jwtToken")
    // if( !isFetching ){
        if( !token || isTokenExpired(token) ){
            try{
                // isFetching = true
                const response = await fetch("/refresh")
                const res = await response.json()
                // isFetching = false
                localStorage.setItem("jwtToken",res.token)
            }catch(err){
                console.log(err);
            }
        // }    
    }
    return localStorage.getItem("jwtToken")
}

export const getList = (navigate,route,id,LIST_SET,LOADING_START,LOADING_FINISH)=>{
    return (dispatch)=>{
        const func = async token =>{
            try{
                dispatch(loadingStart(LOADING_START))
                const response = await fetch(`/${route}/`+id,{
                    headers : getHeaders(token)
                })
                const result = await response.json()
                if(result.access){
                    dispatch(listSeter(LIST_SET,result.list))
                }
                dispatch(loadingFinish(LOADING_FINISH))
            }catch(err){
                navigate("/"+HOME)
                dispatch(loadingFinish(LOADING_FINISH))
            }
        }
        checkToken(func,navigate)
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

export const checkToken = async (func,navigate)=>{
    const token = await getToken()
    if(token){
        func(token)
    }else{
        navigate("/"+LOGIN)
    }
}