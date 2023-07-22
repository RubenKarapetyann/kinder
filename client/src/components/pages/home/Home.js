import { useDispatch, useSelector } from "react-redux"
import "./css/Home.css"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { getHomePosts } from "../../../redux/reducers/homeSlice/homeReducer"
import Post from "../../usable-components/post/Post"
import { getLoading } from "../../../utils/loading-helper"

function Home(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, posts } = useSelector(store=>store.home)


    useEffect(()=>{
        dispatch(getHomePosts(navigate))
    },[])

    

    return(
        <div className="post">
            {getLoading(loading)}
            {posts.map(post=>{
                return <Post
                    autherUserName={post.auther.userName}
                    key={post.id}
                    likes={post.likes}
                    description={post.postDescription}
                    autherAvatarImg={post.auther.avatarImg}
                    img={post.img}
                    liked={post.liked}
                    postId={post.id}
                    favorite={post.favorite}
                    autherId={post.auther.id}
                />
            })}
        </div>
    )
}


export default Home