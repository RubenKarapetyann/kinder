import { Link } from "react-router-dom"
import AnyText from "../more/AnyText"
import ProfileTitle from "../profile/ProfileTitle/ProfileTitle"
import PostImage from "./PostImage"
import PostTools from "./PostTools/PostTools"
import "./css/Post.css"

function Post({ autherUserName, likes, description, autherAvatarImg, img, liked, postId, favorite, isSingle, autherId }){
    const ProfileMiddleware = (children)=> <Link to={"/profile/"+autherId} className="link-without-styles">{children}</Link>
    return(
        <>
            <div className="post-top-part">
                <ProfileTitle userName={autherUserName} avatarImg={autherAvatarImg} middleware={ProfileMiddleware}/>
            </div>
            <PostImage img={img}/>
            <PostTools liked={liked} favorite={favorite} postId={postId} isSingle={isSingle}/>
            <AnyText 
                divClass={"post-likes-comments"} 
                pClass={"post-likes"}
                text={likes + " likes"}
            />
            <AnyText 
                divClass={"post-description"} 
                pClass={"post-description-text"}
                text={description}
            />
            <hr/>
        </>
    )
}

export default Post