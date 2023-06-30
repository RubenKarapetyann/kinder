import "./MessageInput.css"
const MessageInput =()=>{
    return(
        <div className="message-input-container">
            <hr/>
            <div className="form-group message-input-inner-container">
                <textarea className="form-control message-input" id="exampleFormControlTextarea1" rows="1"></textarea>
                <button className="btn btn-primary">Send</button>
            </div>
        </div>
    )
}
export default MessageInput