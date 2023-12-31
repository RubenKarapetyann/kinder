import { Navigate, Route, Routes } from "react-router"
import { LOGIN, HOME, FRIENDS, NOTIFICATIONS, MESSAGES, NEW_POST, PROFILE, SETTINGS, LOG_OUT, REGISTER, CHAT, COMMENTS, ADD_FRIEND, POST, MY_PROFILE } from "../constants/routes-constants"
import { lazy } from "react"
import { useSelector } from "react-redux"
import { SETTINGS_ROUTES } from "../constants/settings-constants"
import WindowWithCloseButton from "../components/usable-components/window/window-with-close-btn/WindowWithCloseButton"

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
const AddFriend = lazy(()=>import("../components/pages/add-friend/AddFriend"))
const Post = lazy(()=>import("../components/pages/post/Post"))
const Logout = lazy(()=>import("../components/pages/logout/Logout"))

function Router(){
    const { user } = useSelector(store=>store.user)
    
    const checkAuth = (element)=>{
        return user.isAuth ? element : <Navigate to={"/"+LOGIN}/>
    }
    return(
        <main className="container">
            <Routes>
                <Route path="*" element={<Navigate to={HOME}/>}/>
                <Route path={LOGIN} element={user.isAuth ? <Navigate to={HOME}/> : <Login/>}/>
                <Route path={REGISTER} element={user.isAuth ? <Navigate to={HOME}/> : <Register/>}/>
                <Route path={HOME} element={checkAuth(<Home/>)}/>
                <Route path={FRIENDS} element={<Friends/>}/>
                <Route path={NOTIFICATIONS} element={<Notifications/>}/>
                <Route path={MESSAGES} element={<Messages/>}/>
                <Route path={NEW_POST} element={<NewPost/>}/>
                <Route path={PROFILE} element={<Profile/>}/>
                <Route path={SETTINGS+"/*"} element={<Settings/>}>
                    {SETTINGS_ROUTES().map(setting=>{
                            return <Route 
                                path={setting.title} 
                                element={<WindowWithCloseButton title={setting.title}>{setting.element}</WindowWithCloseButton>} 
                                key={setting.id} 
                            />
                        })}
                </Route>
                <Route path={LOG_OUT} element={<Logout/>}/>
                <Route path={CHAT} element={<Chat/>}/>
                <Route path={COMMENTS} element={<Comments/>}/>
                <Route path={ADD_FRIEND} element={<AddFriend/>}/>
                <Route path={POST} element={<Post/>}/>
                <Route path={MY_PROFILE} element={<Profile/>}/>
            </Routes>
        </main>
    )
}

export default Router