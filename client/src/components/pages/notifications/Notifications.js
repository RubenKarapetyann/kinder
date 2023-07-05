import ProfileListItem from "../../usable-components/profile/ProfileListItem"
import { FRIENDS_DROPDOWN } from "../../../constants/friends-constants"
import DropDown from "../../usable-components/dropdown/DropDown"
import Title from "../../usable-components/more/Title"
import { useSelector } from "react-redux"

function Notifications(){
    const notifications  = useSelector(store=>store.notifications.list)

    return (
        <>
            {notifications.map(notification=>{
                return (
                    <ProfileListItem 
                        hr={false} 
                        userName={notification.userName} 
                        comment={notification.text}
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