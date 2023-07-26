import { useDispatch } from "react-redux"
import { checkAuthentication } from "../../../redux/reducers/userSlice/UserReducer"
import { useEffect } from "react"
import { useNavigate } from "react-router"

const CheckAuthentication = ({ children })=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
      dispatch(checkAuthentication(navigate))
    },[])

    return <>{children}</>
    
}

export default CheckAuthentication