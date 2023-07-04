import MessageInput from "../../usable-components/messages/messageInput/MessageInput"
import CommentsBox from "./components/CommentsBox"
import LeftArrow from "./components/LeftArrow"
import "./css/Comments.css"

function Comments(){
    return(
        <>
            <LeftArrow/>
            <CommentsBox/>
            <MessageInput/>
        </>
    )   
}

export default Comments