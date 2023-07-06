import { useEffect, useRef, useState } from "react"
import FormInput from "../../../usable-components/form/FormInput"
import { useNavigate } from "react-router"
import { getHeaders } from "../../../../constants/api-constants"
import { HOME } from "../../../../constants/routes-constants"

const PostDescription = ({ children, file })=>{
    const [value,setValue] = useState("")
    const changeHandle = e => setValue(e.target.value)
    const formData = useRef(new FormData())
    const navigate = useNavigate()


    useEffect(()=>{
        formData.current.set("file",file,"post.jpg")
        formData.current.set("description",value)
    },[value,file])



    return(
        <div className="posting-container">
            <div className="mb-3">
                {children.slice(0,2)}
            </div>
            <FormInput name={"Description"} type={"text"} value={value} changeHandle={changeHandle}/> 
            {children[2](sendHandle)}
        </div>
    )
}

export default PostDescription