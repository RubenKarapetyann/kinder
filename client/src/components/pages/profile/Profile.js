import { useDispatch, useSelector } from "react-redux"
import ProfileDescription from "./components/ProfileDescription"
import "./css/Profile.css"
import ProfilePostsList from "./components/ProfilePostsList"
import { useNavigate, useParams } from "react-router"
import { useEffect } from "react"
import { getProfile } from "../../../redux/reducers/profileSlice/profileReducer"

function Profile(){
  const loading = useSelector(store=>store.profile.loading)
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getProfile(navigate,id))
  },[])



  if(loading){return<p>loading...</p>}
  return(
      <div className="profile-container">
        <ProfileDescription/>
        <hr/>
        <ProfilePostsList/>
    </div>
  )
}

export default Profile