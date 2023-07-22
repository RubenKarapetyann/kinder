import { useRef, useState } from "react"
import "./css/NewPost.css"
import PostDescription from "./components/PostDescription";

function NewPost(){

    const [file,setFile] = useState()
    

    return(
        <PostDescription file={file}>
            <label htmlFor="formFile" className="form-label"></label>
            <input 
                onChange={(e)=>setFile(e.target.files[0])} 
                accept=".png, .jpg, .jpeg" 
                className="form-control" 
                type="file" 
                id="formFile" 
                name="file"
            />
            {loading=><button className="btn btn-primary" disabled={loading}>Post</button>}
        </PostDescription>
    )   
}

export default NewPost