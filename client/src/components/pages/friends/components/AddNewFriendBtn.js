import { Link } from "react-router-dom"
import "../css/Friends.css"
import { FaUserPlus } from "react-icons/fa"
import { ADD_FRIEND } from "../../../../constants/routes-constants"


const AddNewFriendBtn =()=>{
    return(
        <Link className="add-new-friend-btn link-without-styles" to={"/"+ADD_FRIEND}><FaUserPlus/></Link>
    )
}
export default AddNewFriendBtn