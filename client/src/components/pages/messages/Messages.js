import { useDispatch, useSelector } from "react-redux"
import ProfileListItem from "../../usable-components/profile/ProfileListItem"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { getMessagesList } from "../../../redux/reducers/messagesSlice/messagesReducer"
import { Link } from "react-router-dom"
import { getHowLongItsBeen } from "../../../utils/time-helper"
import { getLoading } from "../../../utils/loading-helper"

function Messages(){
    const { messages, loading } = useSelector(store=>store.messages)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getMessagesList(navigate))
    },[])




    return (
        <>
            {getLoading(loading)}
            {messages.map(message=>{
                return(
                    <Link to={message.chatId} key={message.chatId} className="link-without-styles">
                        <ProfileListItem 
                            userName={message.sender.userName} 
                            comment={message.lastMessage.text} 
                            avatarImg={message.sender.avatarImg}
                        >
                            <span>{getHowLongItsBeen(message.lastMessage.sendDate)}</span>
                        </ProfileListItem>
                    </Link>
                )
            })}
        </>
    )
}

                

export default Messages