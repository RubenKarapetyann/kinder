import { sendComment } from "../../../redux/reducers/commentsSlice/commentsReducer"
import InputControl from "../../usable-components/messages/InputControl"
import CommentsBox from "./components/CommentsBox"
import LeftArrow from "./components/LeftArrow"
import "./css/Comments.css"

function Comments(){
    return(
        <>
            <LeftArrow/>
            <CommentsBox/>
            <InputControl type={"comments"} handle={sendComment}/>
        </>
    )   
}

export default Comments