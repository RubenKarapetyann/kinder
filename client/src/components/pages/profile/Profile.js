import { useDispatch, useSelector } from "react-redux"
import ProfileDescription from "./components/ProfileDescription"
import "./css/Profile.css"
import ProfilePostsList from "./components/ProfilePostsList"
import { useNavigate, useParams } from "react-router"
import { useEffect } from "react"
import { getProfile } from "../../../redux/reducers/profileSlice/profileReducer"
import { HOME } from "../../../constants/routes-constants"
import { getLoading } from "../../../utils/loading-helper"
import { FAVORITES } from "../../../constants/profile-constants"
import { LOADING_FINISH, LOADING_START, SET_FAVORITES } from "../../../constants/profile-slice-constants"
import { getList } from "../../../utils/api-helper"
import ProfileTabs from "./components/ProfileTabs"

function Profile(){
  const { activeTab, loading, profile } = useSelector(store=>store.profile)
  const user = useSelector(store=>store.user.user)
  const { id:userId } = useParams()
  const id = userId ? userId : user.id
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(id){
      dispatch(getProfile(navigate,id))
    }else{
      navigate("/"+HOME)
    }
  },[id])

  useEffect(()=>{
    if(activeTab === FAVORITES && !profile.favorites){
      dispatch(getList(navigate,"favorites",id,SET_FAVORITES,LOADING_START,LOADING_FINISH))
    }
  },[activeTab])

  return(
      <div className="profile-container">
        {getLoading(loading)}
        <ProfileDescription/>
        <hr/>
        {id === user.id && <ProfileTabs/>}
        <ProfilePostsList/>
    </div>
  )
}

export default Profile