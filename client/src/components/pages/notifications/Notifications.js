import ProfileListItem from "../../usable-components/profile/ProfileListItem"
import { FRIENDS_DROPDOWN } from "../../../constants/friends-constants"
import DropDown from "../../usable-components/dropdown/DropDown"
import Title from "../../usable-components/more/Title"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { getNotifications } from "../../../redux/reducers/notificationsSlice/notificationsReducer"

function Notifications(){
    const notifications  = useSelector(store=>store.notifications.list)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getNotifications(navigate))
    },[])

    return (
        <>
            {notifications.map(notification=>{
                return (
                    <ProfileListItem 
                        hr={false} 
                        userName={notification.userName} 
                        comment={notification.text}
                        key={notification.id}
                    >
                        <DropDown list={FRIENDS_DROPDOWN}/>
                    </ProfileListItem>
                )
            })}
            {/* <Title text={new Date().getTime()}/> */}
            
        </>

        )
}

                

export default Notifications