import { useState } from "react"
import MessageInput from "../../../usable-components/messages/messageInput/MessageInput"
import { sendComment } from "../../../../redux/reducers/commentsSlice/commentsReducer"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"

const CommentInput = ()=>{
    const [value,setValue] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id:postId } = useParams()
    const loading = useSelector(store=>store.comments.loading)  


    const changeHandle  = e =>setValue(e.target.value)
    const sendHandle = e =>{
        dispatch(sendComment(navigate,value,postId))
        setValue("")
    }


    return <MessageInput value={value} changeHandle={changeHandle} sendHandle={sendHandle} loading={loading}/>
    
}

export default CommentInput