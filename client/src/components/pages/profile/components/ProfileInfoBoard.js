const ProfileInfoBoard = ({ text, comment })=>{
    return(
        <div class="profile-info-posts">
            <p class="profile-item-count">{text}</p>
            <p class="profile-item-name">{comment}</p>
        </div>
    )
}
export default ProfileInfoBoard