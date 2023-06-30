import { Navigate, Route, Routes, useLocation } from "react-router"
import { LOGIN, HOME, FRIENDS, NOTIFICATIONS, MESSAGES, NEW_POST, PROFILE, SETTINGS, LOG_OUT, REGISTER, CHAT, COMMENTS } from "../constants/routes-constants"
import { lazy } from "react"
import Header from "../components/header/Header"

const Home = lazy(()=>import("../components/pages/home/Home"))
const Friends = lazy(()=>import("../components/pages/friends/Friends"))
const Login = lazy(()=>import("../components/pages/login/Login"))
const Register = lazy(()=>import("../components/pages/register/Register"))
const Messages = lazy(()=>import("../components/pages/messages/Messages"))
const Notifications = lazy(()=>import("../components/pages/notifications/Notifications"))
const NewPost = lazy(()=>import("../components/pages/new-post/NewPost"))
const Settings = lazy(()=>import("../components/pages/settings/Settings"))
const Profile = lazy(()=>import("../components/pages/profile/Profile"))
const Chat = lazy(()=>import("../components/pages/chat/Chat"))
const Comments = lazy(()=>import("../components/pages/comments/Comments"))
//ete voroshes reduxov anes headery tar app.js
function Router(){
    const location = useLocation()
    return(
        <>
            {location.pathname !== "/login" && 
            location.pathname !== "/register" && 
            <Header/>}
            <main className="container">
                <Routes>
                    <Route path="*" element={<Navigate to={HOME}/>}/>
                    <Route path={LOGIN} element={<Login/>}/>
                    <Route path={REGISTER} element={<Register/>}/>
                    <Route path={HOME} element={<Home/>}/>
                    <Route path={FRIENDS} element={<Friends/>}/>
                    <Route path={NOTIFICATIONS} element={<Notifications/>}/>
                    <Route path={MESSAGES} element={<Messages/>}/>
                    <Route path={NEW_POST} element={<NewPost/>}/>
                    <Route path={PROFILE} element={<Profile/>}/>
                    <Route path={SETTINGS} element={<Settings/>}/>
                    <Route path={LOG_OUT} element={<p>logout</p>}/>
                    <Route path={CHAT} element={<Chat/>}/>
                    <Route path={COMMENTS} element={<Comments/>}/>
                </Routes>
            </main>
        </>
    )
}

export default Router