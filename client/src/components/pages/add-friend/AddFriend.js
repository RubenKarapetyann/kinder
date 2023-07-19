import Friend from "./components/Friend"
import { useSelector } from "react-redux"
import SearchDecoration from "./components/SearchDecoration"
import "./css/AddFriend.css"
import { getLoading } from "../../../utils/loading-helper"

function AddFriend(){
    const { list, loading } = useSelector(store=>store.addfriend)
    console.log(list);
 
    return (
        <>
            {getLoading(loading)}
            {!list.length && <SearchDecoration/>}
            {list.map(user=>{
                return <Friend
                    userName={user.userName}
                    avatarImg={user.avatarImg}
                    key={user.id}
                    id={user.id}
                    status={user.status}
                />
            })}
        </>
    )
}

                

export default AddFriend