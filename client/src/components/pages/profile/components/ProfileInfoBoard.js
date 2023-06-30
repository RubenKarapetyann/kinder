const ProfileInfoBoard = ({ text, comment })=>{
    return(
        <div className="profile-info-posts">
            <p className="profile-item-count">{text}</p>
            <p className="profile-item-name">{comment}</p>
        </div>
    )
}
export default ProfileInfoBoard