import { useState } from "react"
import MessageInput from "../../../usable-components/messages/messageInput/MessageInput"
import { sendComment } from "../../../../redux/reducers/commentsSlice/commentsReducer"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router"

const CommentInput = ()=>{
    const [value,setValue] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id:postId } = useParams()


    const changeHandle  = e =>setValue(e.target.value)
    const sendHandle = e =>{
        dispatch(sendComment(navigate,value,postId))
    }

    console.log(value);

    return (
        <MessageInput value={value} changeHandle={changeHandle} sendHandle={sendHandle}/>
    )
}

export default CommentInput