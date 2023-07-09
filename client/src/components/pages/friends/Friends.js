import { useEffect } from "react"
import { FRIENDS_DROPDOWN } from "../../../constants/friends-constants"
import DropDown from "../../usable-components/dropdown/DropDown"
import ProfileListItem from "../../usable-components/profile/ProfileListItem"
import { useDispatch, useSelector } from "react-redux"
import { getFriends } from "../../../redux/reducers/friendsSlice/friendsReducer"
import { useNavigate } from "react-router"

function Friends(){
    const { loading, list } = useSelector(store=>store.friends)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getFriends(navigate))
    },[])


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