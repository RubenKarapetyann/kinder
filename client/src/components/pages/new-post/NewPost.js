import { useRef, useState } from "react"
import FormInput from "../../usable-components/form/FormInput"
import "./css/NewPost.css"

function NewPost(){
    const [value,setValue] = useState("")
    const changeHandle = e => setValue(e.target.value)


    let fileLoaderRef = useRef(null)
    return(
        <div className="posting-container">
            <div className="mb-3">
                <label htmlFor="formFile" className="form-label"></label>
                <input className="form-control" type="file" id="formFile" ref={fileLoaderRef}/>
            </div>
            <FormInput name={"Description"} type={"text"} value={value} changeHandle={changeHandle}/>
            <button className="btn btn-primary">Post</button>
        </div>
    )   
}

export default NewPost