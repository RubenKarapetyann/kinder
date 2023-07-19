import { useDispatch, useSelector } from "react-redux"
import ProfileDescription from "./components/ProfileDescription"
import "./css/Profile.css"
import ProfilePostsList from "./components/ProfilePostsList"
import { useNavigate, useParams } from "react-router"
import { useEffect } from "react"
import { getProfile } from "../../../redux/reducers/profileSlice/profileReducer"
import { HOME } from "../../../constants/routes-constants"
import { getLoading } from "../../../utils/loading-helper"

function Profile(){
  const loading = useSelector(store=>store.profile.loading)
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
  },[])


  return(
      <div className="profile-container">
        {getLoading(loading)}
        <ProfileDescription/>
        <hr/>
        <ProfilePostsList/>
    </div>
  )
}

export default Profile