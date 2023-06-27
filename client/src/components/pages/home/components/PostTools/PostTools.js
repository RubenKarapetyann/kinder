import RateTools from "./components/RateTools"
import like from "../../../../../images/post-tools/like.svg"
import comment from "../../../../../images/post-tools/comment.svg"
import favorite from "../../../../../images/post-tools/favorite.svg"

const PostTools = ()=>{
    return(
        <div class="post-tools">
            <RateTools divClass={"likecom"}>
                <img src={like} alt="like"/>
                <img src={comment} alt="comment"/>
            </RateTools>
            <RateTools divClass={"favorite-div"}>
                <img src={favorite} alt="favorite"/>
            </RateTools>
        </div>
    )
}
export default PostTools