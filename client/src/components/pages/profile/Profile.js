import ProfileDescription from "./components/ProfileDescription"
import ProfilePost from "./components/ProfilePost"
import "./css/Profile.css"

function Profile(){
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