import "./ProfileTitle.css"

const ProfileTitle = ({ userName, comment, children, avatarImg="https://ionicframework.com/docs/img/demos/avatar.svg" })=>{
    return(
        <div className="profile-title-container">
            <img src={avatarImg} alt="mdo" width="32" height="32" className="rounded-circle"/>
            <div className="profile-title-info">
                <div className="profile-title-info-container">
                    <span className="profile-title-username">{userName}</span>
                    <span className="profile-title-comment">{comment}</span>
                </div>
                <div className="profile-title-function">{children}</div>
            </div>
        </div>
    )
}

export default ProfileTitle