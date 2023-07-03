import { useDispatch, useSelector } from "react-redux"
import ProfileListItem from "../../usable-components/profile/ProfileListItem"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { getMessagesList } from "../../../redux/reducers/messagesSlice/messagesReducer"

function Messages(){
    const { messages, loading } = useSelector(store=>store.messages)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getMessagesList(navigate))
    },[])

    if(loading){return<p>loading</p>}

    return (
        <>
            <ProfileListItem userName={"Ruben"} comment={"hello Nick!"}>
                <span>5 min ago</span>
            </ProfileListItem>
        </>
    )
}

                

export default Messages