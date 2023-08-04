import ProfileListItem from "../../usable-components/profile/ProfileListItem"
import Title from "../../usable-components/more/Title"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import { getNotifications } from "../../../redux/reducers/notificationsSlice/notificationsReducer"

function Notifications(){
    const notifications  = useSelector(store=>store.notifications.list)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let prevDate = useRef({})

    useEffect(()=>{
        dispatch(getNotifications(navigate))
    },[])

    return (
        <>
            {notifications.map(notification=>{
                const currentDate = `${new Date(notification.date).getFullYear()}-${new Date(notification.date).getMonth()}-${new Date(notification.date).getDay()}`
                prevDate.current = {
                    prevDate : prevDate.current.currentDate,
                    currentDate,
                }
                // const NOTIFICATIONS_DROPDOWN = [
                //     {
                //         id : Math.random(),
                //         displayName : "Profile",
                //         routeName : PROFILE+"/"+notification.autherId
                //     }
                // ]  add there dropdown if you want
                return (
                    <div key={notification.id}>
                        { prevDate.current.prevDate !== currentDate ? <>
                            <br/>
                            <Title text={currentDate}/>
                        </> : null}
                        <ProfileListItem 
                            avatarImg={notification.avatarImg}
                            hr={false} 
                            userName={notification.userName} 
                            comment={notification.text}
                            type="notifications"
                        >
                            {/* <DropDown list={NOTIFICATIONS_DROPDOWN}/> */}
                        </ProfileListItem>
                    </div>
                )
            })}
            
        </>

        )
}

                

export default Notifications