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


    useEffect(()=>{
        dispatch(handle(navigate,id))
    },[])
    
    useEffect(()=>{
        boxRef.current.scrollIntoView(false)
    },[list.length])

    return(
        <div ref={boxRef} style={{
            minHeight: "70vh",
            scrollBehavior : "smooth"
        }}>
            {list.map(item=>{
                return <Message 
                            other={type === "comments" || !(item.autherId === userId)}
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