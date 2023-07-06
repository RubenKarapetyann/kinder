import { useEffect, useRef, useState } from "react"
import FormInput from "../../../usable-components/form/FormInput"
import { useNavigate } from "react-router"
import { HOME } from "../../../../constants/routes-constants"

const PostDescription = ({ children, file })=>{
    const [value,setValue] = useState("")
    const changeHandle = e => setValue(e.target.value)
    const formData = useRef(new FormData())
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
        if(file){
            formData.current.set("file",file,"post.jpg")
        }
        formData.current.set("description",value)
    },[value,file])


    const sendHandle = ()=>{
        const token = localStorage.getItem("jwtToken")
        try{
            setLoading(true)
            fetch("/newpost",{
                headers : {
                    // 'Content-Type': 'multipart/form-data',
                    "authorization" : "Bearer "+token
                },
                method : "POST",
                body : formData.current
            }).then(res=>res.json()).then(result=>{
                if(result.access){
                    navigate("/"+HOME)
                }
                setLoading(false)
            })
        }catch(err){
            setLoading(false)
            navigate("/"+HOME)
        }
        console.log(formData.current.get("file"),formData.current.get("description"))
    }

    return(
        <div className="posting-container">
            <div className="mb-3">
                {children.slice(0,2)}
            </div>
            <FormInput name={"Description"} type={"text"} value={value} changeHandle={changeHandle}/> 
            {children[2](sendHandle,loading)}
        </div>
    )
}

export default PostDescription