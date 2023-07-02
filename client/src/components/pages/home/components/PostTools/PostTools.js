import RateTools from "./components/RateTools"
import Like from "../../../../../images/post-tools/like"
import Favorite from "../../../../../images/post-tools/favorite"
import Comment from "../../../../../images/post-tools/comment"



const PostTools = ({ liked })=>{
    return(
        <div className="post-tools">
            <RateTools divClass={"likecom"}>
                <Like liked={liked}/>
                <Comment/>
            </RateTools>
            <RateTools divClass={"favorite-div"}>
                <Favorite/>
            </RateTools>
        </div>
    )
}
export default PostTools