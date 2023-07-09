import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFriends } from "../../../redux/reducers/friendsSlice/friendsReducer"
import { useNavigate } from "react-router"
import Friend from "./components/Friend"

function Friends(){
    const { loading, list } = useSelector(store=>store.friends)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getFriends(navigate))
    },[])


    if(loading){return<p>loading...</p>}
    return (
        <>
            {list.map(friend=>{
                return <Friend 
                            userName={friend.userName}
                            avatarImg={friend.avatarImg}
                            key={friend.id}
                            id={friend.id}
                            chatId={friend.chatId}
                        />
            })}
            
        </>
    )
}

                

export default Friends