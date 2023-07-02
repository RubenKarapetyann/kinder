import RateTools from "./components/RateTools"
import comment from "../../../../../images/post-tools/comment.svg"
import favorite from "../../../../../images/post-tools/favorite.svg"
import Like from "../../../../../images/post-tools/like"

const PostTools = ({ liked })=>{
    return(
        <div className="post-tools">
            <RateTools divClass={"likecom"}>
                <Like liked={liked}/>
                <img src={comment} alt="comment"/>
            </RateTools>
            <RateTools divClass={"favorite-div"}>
                <img src={favorite} alt="favorite"/>
            </RateTools>
        </div>
    )
}
export default PostTools