import { HEADER_DROPDOWN } from "../../../../constants/header-constants"
import ProfileImg from "../../../usable-components/profile/ProfileImg"
import DropDown from "../../../usable-components/dropdown/DropDown"

const HeaderAccount = ()=>{
    return (
    <div className="dropdown text-end">
        <ProfileImg/>
        <DropDown list={HEADER_DROPDOWN} icon={null}/>
    </div>
    )
}
export default HeaderAccount

