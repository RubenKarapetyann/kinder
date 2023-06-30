import Message from "../../usable-components/messages/message/Message"

function Chat(){
    return(
        <>
            <Message other={false} text={"hello"}/>
            <Message text={"darov"}/>
        </>

    )
}

export default Chat