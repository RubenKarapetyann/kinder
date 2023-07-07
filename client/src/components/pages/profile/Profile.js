import { useSelector } from "react-redux"
import ProfileDescription from "./components/ProfileDescription"
import "./css/Profile.css"
import ProfilePostsList from "./components/ProfilePostsList"

function Profile(){
    const { profile, loading } = useSelector(store=>store.profile)





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