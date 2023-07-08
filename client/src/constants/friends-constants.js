import { FaPaperPlane, FaTrash, FaUser } from "react-icons/fa"
import { PROFILE, MESSAGES } from "./routes-constants"

export const FRIENDS_DROPDOWN = [
    {
        id : Math.random(),
        displayName : "Message",
        routeName : PROFILE,
        icon : <FaPaperPlane/>
    },
    {
        id : Math.random(),
        displayName : "Profile",
        routeName : MESSAGES,
        icon : <FaUser/>
    },
    {
        id : Math.random(),
        hr : true
    },
    {
        id : Math.random(),
        displayName : "Remove",
        routeName : "",
        icon : <FaTrash/>
    },
]