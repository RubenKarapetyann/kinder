import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router"
import Message from "./message/Message"

const MessageBox = ({ handle, type })=>{
    const list = useSelector(store=>store[type].list)
    const { id:userId } = useSelector(store=>store.user.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const boxRef = useRef({})
    const isComments = type === "comments"


    useEffect(()=>{
        dispatch(handle(navigate,id))
    },[id])
    
    useEffect(()=>{
        boxRef.current.scrollTo(0, list.length*200)
    },[list.length])

    return(
        <div ref={boxRef} style={{
            height: isComments ? "auto" : "100%",
            minHeight: isComments ? "65vh" : "auto",
            scrollBehavior : "smooth",
            overflowY : "auto",
        }}>
            {list.map(item=>{
                return <Message 
                other={isComments || !(item.autherId === userId)}
                            text={item.text}
                            key={item.id}
                            likes={item.likes}
                            userName={item.userName}
                            avatarImg={item.avatarImg}
                        />
            })}
        </div>
    )
}
export default MessageBox