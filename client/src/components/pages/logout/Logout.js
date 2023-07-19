import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { userLogout } from "../../../redux/reducers/userSlice/UserReducer"
import { getLoading } from "../../../utils/loading-helper"

function Logout(){
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(userLogout(navigate))
    },[])

    return (
        <>
            {getLoading(true)}
        </>
    )
}

export default Logout