import { useEffect, useRef, useState } from "react"
import FormInput from "../../../usable-components/form/FormInput"
import { useNavigate } from "react-router"
import { HOME } from "../../../../constants/routes-constants"
import { FaUpload } from "react-icons/fa"
import images from "../../../../images/more/images.svg"

const PostDescription = ({ children })=>{
    const [value,setValue] = useState("")
    const formData = useRef(new FormData())
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const reader = new FileReader()
    const [file,setFile] = useState({
        mainFile : null,
        readedFile : null
    })

    useEffect(()=>{
        if(file.mainFile){
            formData.current.set("file",file.mainFile,"post.jpg")
            reader.readAsDataURL(file.mainFile)
            reader.onload = function() {
                setFile({
                    ...file,
                    readedFile : reader.result
                })
            }
        }
        
    },[file])


    const submitHandle = e =>{
        e.preventDefault()
        try{
            const token = localStorage.getItem("jwtToken")
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
    }

    const fileChangeHandle = e => setFile({
        ...file,
        mainFile : e.target.files[0]
    })
    const changeHandle = e => {
        setValue(e.target.value)
        formData.current.set("description",e.target.value)
    }


    return(
        <form className="posting-container" onSubmit={submitHandle}>
            <div className="dropzone">
                <div className="new-post-image-container">
                    <img src={file.readedFile ? file.readedFile : images} style={{
                        width : "200px"
                    }}/>
                </div>
                <input 
                    type="file" 
                    className="new-post-file-input" 
                    id="images" 
                    accept="image/png, image/jpeg, image/jpg" 
                    multiple=""
                    onChange={fileChangeHandle}
                />
                <label htmlFor="images" className="new-post-file-label"><FaUpload/> Upload Image</label>

                {/* <h3>or drag &amp; drop your PNG or JPEG files here</h3> */}
            </div>
            <br/>
            <FormInput name={"Description"} type={"text"} value={value} changeHandle={changeHandle}/> 
            {children(loading)}
        </form>
    )
}

export default PostDescription