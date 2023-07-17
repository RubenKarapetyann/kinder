import { useNavigate } from "react-router"
import ProfileListItem from "../../../usable-components/profile/ProfileListItem"
import { useDispatch } from "react-redux"
import { GET_USER_STATUS } from "../../../../constants/friends-constants"
import { activeFriend } from "../../../../redux/reducers/addFriendSlice/addFriendReducer"

const Friend = ({ userName, avatarImg, id, status })=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <ProfileListItem userName={userName} avatarImg={avatarImg}>
            {GET_USER_STATUS(activeFriend,id,dispatch,navigate)[status]}
        </ProfileListItem>
    )
}

export default Friend