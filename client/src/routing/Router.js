import { Navigate, Route, Routes } from "react-router"
import { HOME, FRIENDS, NOTIFICATIONS, MESSAGES, NEW_POST, PROFILE, SETTINGS, LOG_OUT } from "../constants/routes-constants"
import { lazy } from "react"

const Home = lazy(()=>import("../components/pages/home/Home"))

function Router(){
    return(
        <Routes>
            <Route path="*" element={<Navigate to={HOME}/>}/>
            <Route path={HOME} element={<Home/>}/>
            <Route path={FRIENDS} element={<p>Friends</p>}/>
            <Route path={NOTIFICATIONS} element={<p>Notifications</p>}/>
            <Route path={MESSAGES} element={<p>Messages</p>}/>
            <Route path={NEW_POST} element={<p>new Post</p>}/>
            <Route path={PROFILE} element={<p>Profile</p>}/>
            <Route path={SETTINGS} element={<p>Settings</p>}/>
            <Route path={LOG_OUT} element={<p>logout</p>}/>
        </Routes>
    )
}

export default Router