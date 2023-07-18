import { FaChevronRight } from "react-icons/fa"
import ProfileListItem from "../../../usable-components/profile/ProfileListItem"

const SettingItem = ({ title, current, icon })=>{
    return (
        <ProfileListItem hr={false} userName={title} comment={current} avatarImg={icon}>
            <FaChevronRight/>
        </ProfileListItem>
    )
}
 
export default SettingItem