import "./MessageInput.css"
const MessageInput =({ value, changeHandle, sendHandle, loading })=>{
    return(
        <div className="message-input-container">
            <hr/>
            <div className="form-group message-input-inner-container">
                <textarea 
                    className="form-control message-input" 
                    id="exampleFormControlTextarea1" 
                    rows="1" 
                    value={value}
                    onChange={changeHandle}
                ></textarea>
                <button className="btn btn-primary" disabled={loading} onClick={sendHandle}>Send</button>
            </div>
        </div>
    )
}
export default MessageInput