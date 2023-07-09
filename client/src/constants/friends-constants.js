import { FaPaperPlane, FaTrash, FaUser } from "react-icons/fa"
import { MESSAGES } from "./routes-constants"

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