import { useSelector } from "react-redux"
import ProfilePost from "./ProfilePost"

const ProfilePostsList = ()=>{
    const posts = useSelector(store=>store.profile.profile.posts)
    return (
        <div className="profile-posts-container">
            {posts.map(post=>{
                return <ProfilePost img={post.img} key={post.postId} id={post.postId}/>
            })}
        </div>
    )
}

export default ProfilePostsList