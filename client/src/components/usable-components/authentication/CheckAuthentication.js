import { useDispatch } from "react-redux"
import { checkAuthentication } from "../../../redux/reducers/userSlice/UserReducer"
import { useEffect } from "react"

const CheckAuthentication = ({ children })=>{
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(checkAuthentication())
    },[])

    return <>{children}</>
    
}

export default CheckAuthentication