import { useDispatch } from "react-redux"
import Favorite from "../../../../../../images/post-tools/favorite"
import Like from "../../../../../../images/post-tools/like"
import { activePost } from "../../../../../../redux/reducers/homeSlice/homeReducer"
import { useNavigate } from "react-router"

const RateTool = ({ active,type,postId })=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const activeHandle = ()=>{
        dispatch(activePost(navigate,postId,type))
    }
    return (
        <div onClick={activeHandle}>
            {type==="like" ? <Like active={active}/> : <Favorite active={active}/>}
        </div>
    )
}

export default RateTool