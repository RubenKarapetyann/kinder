import { Link } from "react-router-dom"

const ProfilePost = ({img, id})=>{

    return(
        <div className="profile-img-container">
            <Link to={"/post/"+id} className="link-without-styles" style={{
                display : "flex"
            }}>
                <img className="post-img-photo" src={img} alt="post"/>
            </Link>
        </div>
    )
}

export default ProfilePost