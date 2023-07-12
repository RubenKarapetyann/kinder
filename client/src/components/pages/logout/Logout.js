import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { userLogout } from "../../../redux/reducers/userSlice/UserReducer"


function Logout(){
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(userLogout(navigate))
    },[])


    return (
        <p>loading...</p>
    )
}

export default Logout