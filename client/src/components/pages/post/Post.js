import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { getPost } from "../../../redux/reducers/postSlice/postReducer"
import SinglePost from "../../usable-components/post/Post"
import LeftArrow from "../../usable-components/more/LeftArrow"
import { getLoading } from "../../../utils/loading-helper"

function Post (){
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { post, loading } = useSelector(store=>store.post)

    useEffect(()=>{
        dispatch(getPost(navigate,id))
    },[])

    return (
        <>
            {getLoading(loading)}
            <LeftArrow/>
            <SinglePost
                autherUserName={post.auther.userName}
                key={post.id}
                likes={post.likes}
                description={post.postDescription}
                autherAvatarImg={post.auther.avatarImg}
                img={post.img}
                liked={post.liked}
                postId={post.id}
                favorite={post.favorite}
                isSingle
                autherId={post.auther.id}
            />
        </>
        
    )
}

export default Post