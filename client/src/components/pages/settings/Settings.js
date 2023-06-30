import Title from "../../usable-components/more/Title"
import ProfileListItem from "../../usable-components/profile/ProfileListItem"
import { FaChevronRight } from "react-icons/fa"
function Settings(){
    return(
        <>
            <Title text={"Log Out"}/>
            <ProfileListItem hr={false} userName={"logout"}>
                <FaChevronRight/>
            </ProfileListItem>
        </>
    )
}

export default Settings