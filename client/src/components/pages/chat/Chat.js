import Message from "../../usable-components/messages/message/Message"
import MessageInput from "../../usable-components/messages/messageInput/MessageInput"

function Chat(){
    return(
        <>
            <div style={{
                minHeight: "70vh"
            }}>
                <Message other={false} text={"hello"}/>
                <Message text={"darov"}/>
            </div>
            <MessageInput/>
        </>


    )
}

export default Chat