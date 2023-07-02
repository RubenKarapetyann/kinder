import RateTools from "./components/RateTools"
import comment from "../../../../../images/post-tools/comment.svg"
import Like from "../../../../../images/post-tools/like"
import Favorite from "../../../../../images/post-tools/favorite"

const PostTools = ({ liked })=>{
    return(
        <div className="post-tools">
            <RateTools divClass={"likecom"}>
                <Like liked={liked}/>
                <img src={comment} alt="comment"/>
            </RateTools>
            <RateTools divClass={"favorite-div"}>
                <Favorite/>
            </RateTools>
        </div>
    )
}
export default PostTools