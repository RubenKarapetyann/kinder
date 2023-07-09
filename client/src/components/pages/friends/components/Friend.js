import { FRIENDS_DROPDOWN } from "../../../../constants/friends-constants"
import DropDown from "../../../usable-components/dropdown/DropDown"
import ProfileListItem from "../../../usable-components/profile/ProfileListItem"

const Friend = ({ userName, avatarImg, id, chatId })=>{
    const dropdown = FRIENDS_DROPDOWN(id,chatId)
    return (//try to use link
        <ProfileListItem userName={userName} avatarImg={avatarImg}>
            <DropDown list={dropdown}/>
        </ProfileListItem>
    )
}

export default Friend