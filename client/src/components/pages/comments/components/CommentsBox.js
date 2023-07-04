import { useDispatch, useSelector } from "react-redux"
import Message from "../../../usable-components/messages/message/Message"
import { useEffect } from "react"
import { getCommentsList } from "../../../../redux/reducers/commentsSlice/commentsReducer"
import { useNavigate, useParams } from "react-router"

const CommentsBox = ()=>{
    const { loading, comments } = useSelector(store=>store.comments)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id:postId } = useParams()

    console.log(comments);
    useEffect(()=>{
        dispatch(getCommentsList(navigate,postId))
    },[])
    
    if(loading){return<p>loading</p>}
    return(
        <div style={{
            minHeight: "70vh"
        }}>
            {comments.map(comment=>{
                return <Message 
                            text={comment.text}
                            key={comment.commentId}
                        />
            })}
        </div>
    )
}

export default CommentsBox