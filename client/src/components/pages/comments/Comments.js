import CommentInput from "./components/CommentInput"
import CommentsBox from "./components/CommentsBox"
import LeftArrow from "./components/LeftArrow"
import "./css/Comments.css"

function Comments(){
    return(
        <>
            <LeftArrow/>
            <CommentsBox/>
            <CommentInput/>
        </>
    )   
}

export default Comments