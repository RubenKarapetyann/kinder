import { HOME, FRIENDS, NOTIFICATIONS, MESSAGES, NEW_POST, SETTINGS, PROFILE, LOG_OUT, ADD_FRIEND } from "../constants/routes-constants"
import friendsIcon from "../images/tabs/friends.svg"
import homeIcon from "../images/tabs/home.svg"
import notificationsIcon from "../images/tabs/notifications.svg"
import messagesIcon from "../images/tabs/messages.svg"
import { FaCog, FaPlus, FaSignOutAlt, FaUser } from "react-icons/fa"

export const HEADER_ITEMS = [
    {
        id : Math.random(),
        displayName : "home",
        displayIcon : <img src={homeIcon} alt="home"/>,
        routeName : HOME
    },
    {
        id : Math.random(),
        displayName : "friends",
        displayIcon : <img src={friendsIcon} alt="friends"/>,
        routeName : FRIENDS
    },
    {
        id : Math.random(),
        displayName : "notifications",
        displayIcon : <img src={notificationsIcon} alt="notifications"/>,
        routeName : NOTIFICATIONS
    },
    {
        id : Math.random(),
        displayName : "messages",
        displayIcon : <img src={messagesIcon} alt="messages"/>,
        routeName : MESSAGES
    },
]

export const HEADER_DROPDOWN = [
    {
        id : Math.random(),
        displayName : "New Post",
        routeName : NEW_POST,
        icon : <FaPlus/>
    },
    {
        id : Math.random(),
        displayName : "Settings",
        routeName : SETTINGS,
        icon : <FaCog/>
    },
    {
        id : Math.random(),
        displayName : "Profile",
        routeName : PROFILE,
        icon : <FaUser/>
    },
    {
        id : Math.random(),
        hr : true
    },
    {
        id : Math.random(),
        displayName : "Sign out",
        routeName : LOG_OUT,
        icon : <FaSignOutAlt/>
    },

]

export const NEED_SEARCH = [FRIENDS, MESSAGES, ADD_FRIEND]
