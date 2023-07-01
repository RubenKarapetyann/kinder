import { useDispatch, useSelector } from "react-redux"
import Post from "./components/Post/Post"

import "./css/Home.css"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { getHomePosts } from "../../../redux/reducers/homeSlice/homeReducer"

function Home(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const posts = useSelector(store=>store.home)


    useEffect(()=>{
        if(posts === null){
            dispatch(getHomePosts(navigate))
        }
    },[])

    return(
        <div className="post">
            <Post/>
        </div>
    )
}


export default Home