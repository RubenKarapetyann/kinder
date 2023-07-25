import { useLocation } from "react-router"
import Header from "../../header/Header"
import NotificationWindow from "../window/notification-window/NotificationWindow"

const Location = ({ children })=>{
    const location = useLocation()


    return (
        <>
            {location.pathname !== "/login" && 
            location.pathname !== "/register" && 
            <Header/>}
            {children}
            <NotificationWindow text={location.pathname.split("/")[1]} key={Math.random()}/>
        </>
    )
}

export default Location