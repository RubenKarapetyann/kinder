import Message from "../../usable-components/messages/message/Message"
import MessageInput from "../../usable-components/messages/messageInput/MessageInput"
import { FaArrowLeft } from "react-icons/fa"
import "./css/Comments.css"

function Comments(){
    return(
        <>
            <div className="back-arrow">
                <FaArrowLeft/>
            </div>
            <div style={{
                minHeight: "70vh"
            }}>
                <Message text={"hello"}/>
                <Message text={"darov"}/>
            </div>
            <MessageInput/>
        </>
    )   
}

export default Comments