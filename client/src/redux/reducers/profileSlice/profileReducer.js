import { POSTS } from "../../../constants/profile-constants"
import { LOADING_START, LOADING_FINISH, SET_PROFILE, TAB_CHANGE, SET_FAVORITES } from "../../../constants/profile-slice-constants"
import { HOME, LOGIN } from "../../../constants/routes-constants"
import { loadingFinish, loadingStart } from "../../../utils/api-helper"
import { setProfile } from "./profileActions"

function profileReducer(state={ loading : false, profile : {auther : {}, posts : [], favorites : null}, activeTab : POSTS }, action){
    switch(action.type){
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
        case SET_PROFILE:
            return {
                ...state,
                profile : action.payload.profile
            }
        case TAB_CHANGE:
            return {
                ...state,
                activeTab : action.payload.activeTab
            }
        case SET_FAVORITES:
            return {
                ...state,
                profile : {
                    ...state.profile,
                    favorites : action.payload.list
                }
            }
        default:
            return state
    }
}

export const getProfile = (navigate,id)=>{
    return (dispatch)=>{
        const token = localStorage.getItem("jwtToken")
        if(token){
            dispatch(loadingStart(LOADING_START))
            try{
                fetch("/profile/"+id,{
                    method : "GET",
                    headers : {
                        'Content-Type': 'application/json',
                        "authorization" : "Bearer "+token
                    }
                }).then(res=>res.json()).then(result=>{
                    if(result.access){
                        dispatch(setProfile(result.profile))
                    }
                    dispatch(loadingFinish(LOADING_FINISH))
                })
            }catch(err){
                navigate("/"+HOME)
            }
        }else{
            navigate("/"+LOGIN)
        }
    }
}

export default profileReducer
