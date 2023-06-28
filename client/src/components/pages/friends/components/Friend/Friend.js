import DropDownItemList from "../../../../usable-components/dropdown/DropDownItemList"
import ProfileTitle from "../../../../usable-components/profile/ProfileTitle/ProfileTitle"
import { FRIENDS_DROPDOWN } from "../../../../../constants/friends-constants"

const Friend = ()=>{
    return(
        <ProfileTitle 
                userName={"Ruben"}
                func={<div class="friend-last-message-age">
                <div class="dropdown text-end">
                    <a href="#" class="d-block link-body-emphasis text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false"> 
                        <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                        ...
                    </a>
                    <DropDownItemList list={FRIENDS_DROPDOWN}/>
                </div>
            </div>}
        />
    )
}

export default Friend