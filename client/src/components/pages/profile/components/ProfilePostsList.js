import { useSelector } from "react-redux"
import ProfilePost from "./ProfilePost"
import { PROFILE_TABS_MAP } from "../../../../constants/profile-constants"

const ProfilePostsList = ()=>{
    const activeTab = useSelector(store=>store.profile.activeTab)
    const list = useSelector(store=>store.profile.profile[PROFILE_TABS_MAP[activeTab].getFromState])


    return (
        <div className="profile-posts-container">
            {list && list.map(post=>{
                return <ProfilePost img={post.img} key={post.postId} id={post.postId}/>
            })}
        </div>
    )
}

export default ProfilePostsList