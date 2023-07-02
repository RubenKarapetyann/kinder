const PostImage = ({ img })=>{
    return (
        <div className="post-img">
            <img 
                className="post-img-photo" 
                src={img}
                alt="post"
            />
        </div>
    )
}
export default PostImage