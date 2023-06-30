import ProfileDescription from "./components/ProfileDescription"
import ProfilePost from "./components/ProfilePost"
import "./css/Profile.css"

function Profile(){
    return(
        <div class="profile-container">
        <ProfileDescription/>
        <hr/>
        <div class="profile-posts-container">
          <ProfilePost/>
        </div>
      </div>
    )
}

export default Profile