import Message from "../../../usable-components/messages/message/Message"

const ChatBox = ()=>{
    return(
        <div style={{
            minHeight: "70vh"
        }}>
            <Message other={false} text={"hello"}/>
            <Message text={"darov"}/>
        </div>
    )
}

export default ChatBox