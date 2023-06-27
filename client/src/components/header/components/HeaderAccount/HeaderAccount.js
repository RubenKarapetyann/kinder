import DropDownItemList from "../../../usable-components/dropdown/DropDownItemList"
import { HEADER_DROPDOWN } from "../../../../constants/header-constants"
import ProfileImg from "../../../usable-components/profile/ProfileImg"

const HeaderAccount = ()=>{
    return (
    <div className="dropdown text-end">
        <ProfileImg/>
        <DropDownItemList list={HEADER_DROPDOWN}/>
    </div>
    )
}
export default HeaderAccount

