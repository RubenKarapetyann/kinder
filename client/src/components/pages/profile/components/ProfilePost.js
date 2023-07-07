const ProfilePost = ({img, id})=>{

    return(
        <div className="profile-img-container">
            <img className="post-img-photo" src={img} alt="post"/>
        </div>
    )
}

export default ProfilePost