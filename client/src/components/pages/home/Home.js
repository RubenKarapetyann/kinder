import { useDispatch, useSelector } from "react-redux"
import "./css/Home.css"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import { getHomePosts } from "../../../redux/reducers/homeSlice/homeReducer"
import Post from "../../usable-components/post/Post"
import { getLoading } from "../../../utils/loading-helper"
import { pageIncrement } from "../../../redux/reducers/homeSlice/homeActions"

function Home(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, posts, page } = useSelector(store=>store.home)
    const contentBoxRef =  useRef(null)
    
    window.onscroll = ()=>{
        try{
            if(window.innerHeight + window.pageYOffset >= contentBoxRef.current.offsetHeight && !loading && posts.length > page*3){
                dispatch(pageIncrement())
                dispatch(getHomePosts(navigate,page+1))
            }
        }catch(err){
            window.onscroll = null
        }
    }


    useEffect(()=>{
        if(page === 0 && posts.length <= 0){
            dispatch(getHomePosts(navigate,page))
        }
        return ()=>{
            window.onscroll = null
        }
    },[])

    

    return(
        <div className="post" ref={contentBoxRef}>
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