import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { getPost } from "../../../redux/reducers/postSlice/postReducer"
import SinglePost from "../home/components/Post/Post"
import "../home/css/Home.css"

function Post (){
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { post, loading } = useSelector(store=>store.post)

    useEffect(()=>{
        dispatch(getPost(navigate,id))
    },[])

    if(loading){return<p>loading</p>}
    return (
        <SinglePost

        />
    )
}

export default Post