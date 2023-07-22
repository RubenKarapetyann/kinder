import "./css/NewPost.css"
import PostDescription from "./components/PostDescription";

function NewPost(){

    return(
        <PostDescription>
            {loading=><button className="btn btn-primary" disabled={loading}>Post</button>}
        </PostDescription>
    )   
}

export default NewPost