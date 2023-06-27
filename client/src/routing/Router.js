import { Navigate, Route, Routes } from "react-router"
import { HOME, FRIENDS, NOTIFICATIONS, MESSAGES } from "../constants/routes-constants"


function Router(){
    return(
        <Routes>
            <Route path="*" element={<Navigate to={HOME}/>}/>
            <Route path={HOME} element={<p>Home</p>}/>
            <Route path={FRIENDS} element={<p>Friends</p>}/>
            <Route path={NOTIFICATIONS} element={<p>Notifications</p>}/>
            <Route path={MESSAGES} element={<p>Messages</p>}/>
        </Routes>
    )
}

export default Router