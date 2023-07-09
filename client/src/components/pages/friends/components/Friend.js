import { FRIENDS_DROPDOWN } from "../../../../constants/friends-constants"
import { deleteFriendById } from "../../../../redux/reducers/friendsSlice/friendsReducer"
import DropDown from "../../../usable-components/dropdown/DropDown"
import ProfileListItem from "../../../usable-components/profile/ProfileListItem"

const Friend = ({ userName, avatarImg, id, chatId })=>{
    const dropdown = FRIENDS_DROPDOWN(id,chatId,deleteFriendById)
    return (//try to use link
        <ProfileListItem userName={userName} avatarImg={avatarImg}>
            <DropDown list={dropdown}/>
        </ProfileListItem>
    )
}

export default Friend