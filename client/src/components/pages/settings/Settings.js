import { SETTINGS_ARR } from "../../../constants/settings-constants"
import Title from "../../usable-components/more/Title"
import { useSelector } from "react-redux"
import SettingItem from "./components/SettingItem"
import { Link, Outlet } from "react-router-dom"
import NotificationWindow from "../../usable-components/window/notification-window/NotificationWindow"

function Settings(){
    const { user } = useSelector(store=>store.user)
    return(
        <>
            {SETTINGS_ARR(user.avatarImg).map(setting=>{
                if(setting.type === "title"){
                    return <span key={setting.id}><br/><Title text={setting.title}/></span>
                }
                return <Link to={setting.routeName} key={setting.id} className="link-without-styles"><SettingItem 
                    title={setting.title} 
                    current={user[setting.takeFromUser]} 
                    icon={setting.icon}
                /></Link>
            })}
            <Outlet/>
            <NotificationWindow text={"settings"}/>
        </>
    )
}

export default Settings