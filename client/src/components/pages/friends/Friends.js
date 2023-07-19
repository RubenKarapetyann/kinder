import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFriends } from "../../../redux/reducers/friendsSlice/friendsReducer"
import { useNavigate } from "react-router"
import Friend from "./components/Friend"
import AddNewFriendBtn from "./components/AddNewFriendBtn"
import { getLoading } from "../../../utils/loading-helper"


function Friends(){
    const { loading, list } = useSelector(store=>store.friends)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getFriends(navigate))
    },[])


    return (
        <>
            {getLoading(loading)}
            {list.map(friend=>{
                return <Friend 
                            userName={friend.userName}
                            avatarImg={friend.avatarImg}
                            key={friend.id}
                            id={friend.id}
                            chatId={friend.chatId}
                        />
            })}
            <AddNewFriendBtn/>
        </>
    )
}

                

export default Friends