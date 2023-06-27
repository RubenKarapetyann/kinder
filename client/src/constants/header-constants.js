import { HOME, FRIENDS, NOTIFICATIONS, MESSAGES } from "../constants/routes-constants"
import friendsIcon from "../images/tabs/friends.svg"
import homeIcon from "../images/tabs/home.svg"
import notificationsIcon from "../images/tabs/notifications.svg"
import messagesIcon from "../images/tabs/messages.svg"

export const HEADER_ITEMS = [
    {
        id : 1,
        displayName : "home",
        displayIcon : <img src={homeIcon} alt="home"/>,
        routeName : HOME
    },
    {
        id : 2,
        displayName : "friends",
        displayIcon : <img src={friendsIcon} alt="friends"/>,
        routeName : FRIENDS
    },
    {
        id : 3,
        displayName : "notifications",
        displayIcon : <img src={notificationsIcon} alt="notifications"/>,
        routeName : NOTIFICATIONS
    },
    {
        id : 4,
        displayName : "messages",
        displayIcon : <img src={messagesIcon} alt="messages"/>,
        routeName : MESSAGES
    },
]