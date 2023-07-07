import ProfileInfoBoard from "../components/ProfileInfoBoard"
import ProfileAvatar from "./ProfileAvatar"
import ProfileInfo from "./ProfileInfo"

const ProfileDescription = ()=>{
    return(
        <>
            <div className="profile-row">
                <ProfileAvatar/>
                <div className="profile-info-friends-posts">
                    <ProfileInfoBoard text={15} comment={"posts"}/>

                    <ProfileInfoBoard text={20} comment={"friends"}/>
                </div>
            </div>
            <ProfileInfo/>
        </>
    )
}
export default ProfileDescription