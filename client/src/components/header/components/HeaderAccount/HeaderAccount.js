import { HEADER_DROPDOWN } from "../../../../constants/header-constants"
import ProfileImg from "../../../usable-components/profile/ProfileImg"
import DropDown from "../../../usable-components/dropdown/DropDown"
import { useSelector } from "react-redux"

const HeaderAccount = ()=>{
    const avatarImg = useSelector(store=>store.user.user.avatarImg)

    return (
        <div className="dropdown text-end">
            <ProfileImg avatarImg={avatarImg}/>
            <DropDown list={HEADER_DROPDOWN} icon={null}/>
        </div>
    )
}
export default HeaderAccount

