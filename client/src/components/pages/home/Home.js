import { useDispatch, useSelector } from "react-redux"
import Post from "./components/Post/Post"

import "./css/Home.css"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { getHomePosts } from "../../../redux/reducers/homeSlice/homeReducer"

function Home(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, posts } = useSelector(store=>store.home)

    console.log(posts);


    useEffect(()=>{
        if(posts === null){
            dispatch(getHomePosts(navigate))
        }
    },[])

    if(loading){<p>loading...</p>}

    return(
        <div className="post">
            <Post/>
        </div>
    )
}


export default Home