import { useSelector } from "react-redux"
import ProfileDescription from "./components/ProfileDescription"
import ProfilePost from "./components/ProfilePost"
import "./css/Profile.css"

function Profile(){
    const { profile, loading } = useSelector(store=>store.profile)





    if(loading){return<p>loading...</p>}
    return(
        <div className="profile-container">
        <ProfileDescription/>
        <hr/>
        <div className="profile-posts-container">
          <ProfilePost/>
        </div>
      </div>
    )
}

export default Profile