import Message from "../../../usable-components/messages/message/Message"

const CommentsBox = ()=>{
    return(
        <div style={{
            minHeight: "70vh"
        }}>
            <Message text={"hello"}/>
            <Message text={"darov"}/>
        </div>
    )
}

export default CommentsBox