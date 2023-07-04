import RateTools from "./components/RateTools"
import Comment from "../../../../../images/post-tools/comment"
import RateTool from "./components/RateTool"
import { Link } from "react-router-dom"


const PostTools = ({ liked,postId,favorite })=>{
    return(
        <div className="post-tools">
            <RateTools divClass={"likecom"}>
                <RateTool active={liked} type={"like"} postId={postId}/>
                <Link to={"/comments/"+postId}><Comment/></Link>
            </RateTools>
            <RateTools divClass={"favorite-div"}>
                <RateTool active={favorite} type={"favorite"} postId={postId}/>
            </RateTools>
        </div>
    )
}
export default PostTools