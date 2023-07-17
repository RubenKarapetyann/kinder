import { FaPaperPlane, FaTrash, FaUser, FaUserCheck, FaUserPlus, FaUserTimes, FaUsers } from "react-icons/fa"
import { MESSAGES } from "./routes-constants"
import { FRIENDS, NOT_FRIENDS, OTHER_SEND, YOU_SEND } from "./add-friend-slice-constants"

export const FRIENDS_DROPDOWN = (id,chatId,handle,navigate,dispatch)=>([
    {
        id : Math.random(),
        displayName : "Message",
        routeName : `/${MESSAGES}/${chatId}`,
        icon : <FaPaperPlane/>
    },
    {
        id : Math.random(),
        displayName : "Profile",
        routeName : `/profile/${id}`,
        icon : <FaUser/>
    },
    {
        id : Math.random(),
        hr : true
    },
    {
        id : Math.random(),
        displayName : "Remove",
        handle : ()=>dispatch(handle(navigate,id)),
        icon : <FaTrash/>
    },
])

export const GET_USER_STATUS = (handle,id,dispatch)=>{
    return {
        [FRIENDS] : <span className="big-icon"><FaUsers/></span>,
        [NOT_FRIENDS] : <span onClick={()=>dispatch(handle(id,NOT_FRIENDS))} className="big-icon"><FaUserPlus/></span>,
        [OTHER_SEND] : <span onClick={()=>dispatch(handle(id,OTHER_SEND))} className="big-icon"><FaUserCheck/></span>,
        [YOU_SEND] : <span onClick={()=>dispatch(handle(id,YOU_SEND))} className="big-icon"><FaUserTimes/></span>
    }
}