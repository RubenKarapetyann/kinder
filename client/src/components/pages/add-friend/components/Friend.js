import { useNavigate } from "react-router"
import ProfileListItem from "../../../usable-components/profile/ProfileListItem"
import { useDispatch } from "react-redux"

const Friend = ({ userName, avatarImg, id })=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <ProfileListItem userName={userName} avatarImg={avatarImg}>
        </ProfileListItem>
    )
}

export default Friend