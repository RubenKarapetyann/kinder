import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { getPost } from "../../../redux/reducers/postSlice/postReducer"

function Post (){
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getPost(navigate,id))
    },[])

    return (
        <>{id}</>
    )
}

export default Post