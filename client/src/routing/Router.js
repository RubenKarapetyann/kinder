import { Navigate, Route, Routes, useLocation } from "react-router"
import { LOGIN, HOME, FRIENDS, NOTIFICATIONS, MESSAGES, NEW_POST, PROFILE, SETTINGS, LOG_OUT } from "../constants/routes-constants"
import { lazy } from "react"
import Header from "../components/header/Header"

const Home = lazy(()=>import("../components/pages/home/Home"))
const Friends = lazy(()=>import("../components/pages/friends/Friends"))
const Login = lazy(()=>import("../components/pages/login/Login"))

function Router(){
    const location = useLocation()
    return(
        <>
            {location.pathname !== "/login" && 
            location.pathname !== "/register" && 
            <Header/>}
            <Routes>
                <Route path="*" element={<Navigate to={HOME}/>}/>
                <Route path={LOGIN} element={<Login/>}/>
                <Route path={HOME} element={<Home/>}/>
                <Route path={FRIENDS} element={<Friends/>}/>
                <Route path={NOTIFICATIONS} element={<p>Notifications</p>}/>
                <Route path={MESSAGES} element={<p>Messages</p>}/>
                <Route path={NEW_POST} element={<p>new Post</p>}/>
                <Route path={PROFILE} element={<p>Profile</p>}/>
                <Route path={SETTINGS} element={<p>Settings</p>}/>
                <Route path={LOG_OUT} element={<p>logout</p>}/>
            </Routes>
        </>
    )
}

export default Router