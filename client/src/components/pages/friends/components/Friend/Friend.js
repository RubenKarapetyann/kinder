import ProfileTitle from "../../../../usable-components/profile/ProfileTitle/ProfileTitle"
import { FRIENDS_DROPDOWN } from "../../../../../constants/friends-constants"
import DropDown from "../../../../usable-components/dropdown/DropDown"


const Friend = ()=>{
    return(
        <>        
            <ProfileTitle userName={"Ruben"}>
                <div className="friend-last-message-age">
                    <DropDown list={FRIENDS_DROPDOWN}/>
                </div>
            </ProfileTitle>
            <hr/>
        </>
    )
}

export default Friend