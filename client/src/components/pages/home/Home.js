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


    useEffect(()=>{
        dispatch(getHomePosts(navigate))
    },[])

    if(loading){<p>loading</p>}


    return(
        <div className="post">
            {posts.map(post=>{
                return <Post
                    autherUserName={post.auther.userName}
                    key={post.id}
                    likes={post.likes}
                    description={post.postDescription}
                    autherAvatarImg={post.auther.avatraImg}
                    img={post.img}
                    liked={post.liked}
                    postId={post.id}
                    favorite={post.favorite}
                />
            })}
        </div>
    )
}


export default Home