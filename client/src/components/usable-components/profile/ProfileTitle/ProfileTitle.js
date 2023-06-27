import "./ProfileTitle.css"

const ProfileTitle = ({ userName, comment, func })=>{
    return(
        <div class="profile-title-container">
            <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="mdo" width="32" height="32" class="rounded-circle"/>
            <div class="profile-title-info">
                <div class="profile-title-info-container">
                    <span class="profile-title-username">{userName}</span>
                    <span class="profile-title-comment">{comment}</span>
                </div>
                <div class="profile-title-function">{func}</div>
            </div>
        </div>
    )
}

export default ProfileTitle