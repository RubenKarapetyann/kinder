import ProfileListItem from "../../usable-components/profile/ProfileListItem"
import { FRIENDS_DROPDOWN } from "../../../constants/friends-constants"
import DropDown from "../../usable-components/dropdown/DropDown"
import Title from "../../usable-components/more/Title"

function Notifications(){
    return (
        <>
            <Title text={new Date().getTime()}/>
            <ProfileListItem hr={false} userName={"Ruben"} comment={"Nick send you friend request"}>
                <DropDown list={FRIENDS_DROPDOWN}/>
            </ProfileListItem>
        </>

        )
}

                

export default Notifications