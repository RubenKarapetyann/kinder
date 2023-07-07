import { useSelector } from "react-redux"
import ProfileInfoBoard from "../components/ProfileInfoBoard"
import ProfileAvatar from "./ProfileAvatar"
import ProfileInfo from "./ProfileInfo"

const ProfileDescription = ()=>{
    const auther = useSelector(store=>store.profile.profile.auther)

    return(
        <>
            <div className="profile-row">
                <ProfileAvatar avatarImg={auther.avatarImg}/>
                <div className="profile-info-friends-posts">
                    <ProfileInfoBoard text={auther.postsCount} comment={"posts"}/>

                    <ProfileInfoBoard text={auther.friendsCount} comment={"friends"}/>
                </div>
            </div>
            <ProfileInfo userName={auther.userName} description={auther.description}/>
        </>
    )
}
export default ProfileDescription