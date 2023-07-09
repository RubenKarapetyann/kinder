import { FRIENDS_DROPDOWN } from "../../../../constants/friends-constants"
import DropDown from "../../../usable-components/dropdown/DropDown"
import ProfileListItem from "../../../usable-components/profile/ProfileListItem"

const Friend = ({ userName, avatarImg, id })=>{
    return (
        <ProfileListItem userName={userName} avatarImg={avatarImg}>
            <DropDown list={FRIENDS_DROPDOWN}/>
        </ProfileListItem>
    )
}

export default Friend