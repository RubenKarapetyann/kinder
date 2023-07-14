import { useDispatch } from "react-redux"
import { getChatList, sendMessage } from "../../../redux/reducers/chatSlice/chatReducer"
import InputControl from "../../usable-components/messages/InputControl"
import MessageBox from "../../usable-components/messages/MessageBox"
import { useParams } from "react-router"
import { useEffect, useRef } from "react"
import { addMessage } from "../../../redux/reducers/chatSlice/chatActions"
import io from "socket.io-client"
import { SERVER_URL } from "../../../constants/api-constants"


function Chat(){

    const socketRef = useRef(null)
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(()=>{
        socketRef.current = io(SERVER_URL, {
            query: { roomId : id }
        })

        socketRef.current.on("message:add",(message)=>{
            dispatch(addMessage(message))
        })

        return () => {
            socketRef.current.disconnect()
        }
    },[])


    return(
        <>
            <MessageBox type={"chat"} handle={getChatList}/>
            <InputControl type={"chat"} handle={sendMessage} socket={socketRef}/>
        </> 
    )
}

export default Chat