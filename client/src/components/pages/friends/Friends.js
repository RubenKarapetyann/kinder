import { FRIENDS_DROPDOWN } from "../../../constants/friends-constants"
import DropDown from "../../usable-components/dropdown/DropDown"
import ProfileListItem from "../../usable-components/profile/ProfileListItem"

function Friends(){
    return (
        <>
            <ProfileListItem userName={"Ruben"}>
                <DropDown list={FRIENDS_DROPDOWN}/>
            </ProfileListItem>
        </>
    )
}

                

export default Friends