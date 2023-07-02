import AnyText from "../../../../usable-components/more/AnyText"
import ProfileTitle from "../../../../usable-components/profile/ProfileTitle/ProfileTitle"
import PostImage from "../PostImage/PostImage"
import PostTools from "../PostTools/PostTools"

function Post({ autherUserName, likes, description, autherAvatarImg, img, liked, postId, favorite }){
    return(
        <>
            <div className="post-top-part">
                <ProfileTitle userName={autherUserName} avatarImg={autherAvatarImg}/>
                {/* <div class="post-manu">
                    <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                </div> */}
            </div>
            <PostImage img={img}/>
            <PostTools liked={liked} favorite={favorite} postId={postId}/>
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