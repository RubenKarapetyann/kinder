import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import MessageInput from "./messageInput/MessageInput"

const InputControl = ({ handle,type,socket })=>{
    const [value,setValue] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const loading = useSelector(store=>store[type].loading)  

    useEffect(()=>{
        setValue("")
    },[id])

    const changeHandle  = e =>setValue(e.target.value)
    const sendHandle = e =>{
        dispatch(handle(navigate,value,id,socket))
        setValue("")
    }


    return <MessageInput value={value} changeHandle={changeHandle} sendHandle={sendHandle} loading={loading}/>
    
}

export default InputControl