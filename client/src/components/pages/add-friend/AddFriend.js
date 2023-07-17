import Friend from "./components/Friend"
import { useSelector } from "react-redux"
import SearchDecoration from "./components/SearchDecoration"
import "./css/AddFriend.css"

function AddFriend(){
    const { list, loading } = useSelector(store=>store.addfriend)
    console.log(list);
 
    if(loading){return<p>loading...</p>}
    return (
        <>
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