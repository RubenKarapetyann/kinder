import { useNavigate } from "react-router"
import { FRIENDS_DROPDOWN } from "../../../../constants/friends-constants"
import { deleteFriendById } from "../../../../redux/reducers/friendsSlice/friendsReducer"
import DropDown from "../../../usable-components/dropdown/DropDown"
import ProfileListItem from "../../../usable-components/profile/ProfileListItem"
import { useDispatch } from "react-redux"

const Friend = ({ userName, avatarImg, id, chatId })=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const dropdown = FRIENDS_DROPDOWN(id,chatId,deleteFriendById,navigate,dispatch)
    return (//try to use link
        <ProfileListItem userName={userName} avatarImg={avatarImg}>
            <DropDown list={dropdown}/>
        </ProfileListItem>
    )
}

export default Friend