import { FaSignOutAlt, FaUser } from "react-icons/fa"
import { LOG_OUT } from "./routes-constants"

export const SETTINGS_ARR = (avatar)=>[
    {
        type : "title",
        title : "Account",
        id : "Account"
    },
    {
        title : "username",
        takeFromUser : "name",
        id : "username",
        icon : <FaUser/>,
        routeName : "username"
    },
    {
        title : "description",
        takeFromUser : "description",
        id : "description",
        icon : <FaUser/>,
        routeName : "description"
    },
    {
        title : "avatar",
        takeFromUser : "",
        id : "avatar",
        icon : avatar,
        routeName : "avatar"
    },
    {
        type : "title",
        title : "Login",
        id : "Login"
    },
    {
        id : "Sign-out",
        title : "Sign Out",
        routeName : "/"+LOG_OUT,
        icon : <FaSignOutAlt/>
    }
]
