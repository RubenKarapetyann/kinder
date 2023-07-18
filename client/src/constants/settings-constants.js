import { FaSignOutAlt, FaUser } from "react-icons/fa"
import { LOG_OUT } from "./routes-constants"
import Window from "../components/pages/settings/components/Window"

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


export const SETTINGS_ROUTES = ()=>[
    {
        title : "username",
        id : "username",
        routeName : "username",
        element : <Window title={"name"} type={"text"}/>,
        takeFromUser : "name"
    },
    {
        title : "description",
        id : "description",
        routeName : "description",
        element : <Window title={"description"} type={"text"}/>,
        takeFromUser : "description"
    },
    {
        title : "avatar",
        id : "avatar",
        routeName : "avatar",
        element : <Window title={"avatarImg"} type={"file"}/>,
        takeFromUser : "avatarImg"
    }
]