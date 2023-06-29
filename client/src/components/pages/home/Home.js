import { useSelector } from "react-redux"
import Post from "./components/Post/Post"

import "./css/Home.css"

function Home(){
    const {user} = useSelector(store=>store.user)
    console.log(user);
    return(
        <div className="post">
            <Post/>
        </div>
    )
}


export default Home