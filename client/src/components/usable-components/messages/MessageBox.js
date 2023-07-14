import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import Message from "./message/Message"

const MessageBox = ({ handle, type })=>{
    const list = useSelector(store=>store[type].list)
    const { id:userId } = useSelector(store=>store.user.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(()=>{
        dispatch(handle(navigate,id))
    },[])
    
    return(
        <div style={{
            minHeight: "70vh"
        }}>
            {list.map(item=>{
                return <Message 
                            other={!(item.autherId === userId)}
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