import { useSelector } from "react-redux"
import Message from "../../../usable-components/messages/message/Message"

const CommentsBox = ()=>{
    const { loading, comments } = useSelector(store=>store.comments)


    
    if(loading){return<p>loading</p>}
    return(
        <div style={{
            minHeight: "70vh"
        }}>
            {comments.map(comment=>{
                return <Message text={comment.text}/>
            })}
        </div>
    )
}

export default CommentsBox