import RateTools from "./components/RateTools"
import Favorite from "../../../../../images/post-tools/favorite"
import Comment from "../../../../../images/post-tools/comment"
import RateTool from "./components/RateTool"



const PostTools = ({ liked,postId,favorite })=>{
    return(
        <div className="post-tools">
            <RateTools divClass={"likecom"}>
                <RateTool active={liked} type={"like"} postId={postId}/>
                <Comment/>
            </RateTools>
            <RateTools divClass={"favorite-div"}>
                <RateTool active={favorite} type={"favorite"} postId={postId}/>
            </RateTools>
        </div>
    )
}
export default PostTools