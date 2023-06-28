import { PROFILE, MESSAGES } from "./routes-constants"

export const FRIENDS_DROPDOWN = [
    {
        id : Math.random(),
        displayName : "Message",
        routeName : PROFILE
    },
    {
        id : Math.random(),
        displayName : "Profile",
        routeName : MESSAGES
    },
    {
        id : Math.random(),
        hr : true
    },
    {
        id : Math.random(),
        displayName : "Remove",
        routeName : ""
    },
]