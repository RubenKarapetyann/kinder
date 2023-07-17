import { useNavigate } from "react-router"
import ProfileListItem from "../../../usable-components/profile/ProfileListItem"
import { useDispatch } from "react-redux"
import { GET_USER_STATUS } from "../../../../constants/friends-constants"
import { activeFriend } from "../../../../redux/reducers/addFriendSlice/addFriendReducer"
import { Link } from "react-router-dom"

const Friend = ({ userName, avatarImg, id, status })=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const ProfileMiddleware = (children)=> <Link to={"/profile/"+id} className="link-without-styles">{children}</Link>
    return (
        <ProfileListItem userName={userName} avatarImg={avatarImg} middleware={ProfileMiddleware}>
            {GET_USER_STATUS(activeFriend,id,dispatch,navigate)[status]}
        </ProfileListItem>
    )
}

export default Friend