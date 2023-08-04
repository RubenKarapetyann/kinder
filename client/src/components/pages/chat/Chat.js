import { useDispatch } from "react-redux"
import { getChatList, sendMessage } from "../../../redux/reducers/chatSlice/chatReducer"
import InputControl from "../../usable-components/messages/InputControl"
import MessageBox from "../../usable-components/messages/MessageBox"
import { useNavigate, useParams } from "react-router"
import { useEffect, useRef } from "react"
import { addMessage } from "../../../redux/reducers/chatSlice/chatActions"
import io from "socket.io-client"
import { SERVER_URL } from "../../../constants/api-constants"
import "./css/Chat.css"
import Messages from "../messages/Messages"
import { getMessagesList } from "../../../redux/reducers/messagesSlice/messagesReducer"

function Chat(){

    const socketRef = useRef(null)
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        socketRef.current = io(SERVER_URL, {
            query: { roomId : id }
        })

        socketRef.current.on("message:add",(message)=>{
            dispatch(addMessage(message))
            if(window.innerWidth > 800){
                dispatch(getMessagesList(navigate))
            }
        })

        return () => {
            socketRef.current.disconnect()
        }
    },[id])


    return(
        <div className="chat-page-container">
            <div className="chat-page-messages-list"><Messages/></div>
            <div className="chat-page-messages-box">
                <MessageBox type={"chat"} handle={getChatList}/>
                <InputControl type={"chat"} handle={sendMessage} socket={socketRef}/>
            </div>
        </div> 
    )
}

export default Chat