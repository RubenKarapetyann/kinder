import { FRIENDS_DROPDOWN } from "../../../constants/friends-constants"
import DropDown from "../../usable-components/dropdown/DropDown"
import ProfileListItem from "../../usable-components/profile/ProfileListItem"
import { useSelector } from "react-redux"

function Friends(){
    const { loading, list } = useSelector(store=>store.friends)


    if(loading){return<p>loading...</p>}
    return (
        <>
            {list.map(friend=>{
                return (
                    <ProfileListItem userName={"Ruben"}>
                        <DropDown list={FRIENDS_DROPDOWN}/>
                    </ProfileListItem>
                )
            })}
            
        </>
    )
}

                

export default Friends