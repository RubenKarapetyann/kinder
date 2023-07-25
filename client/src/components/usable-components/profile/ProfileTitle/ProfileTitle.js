import "./ProfileTitle.css"

const ProfileTitle = ({ userName, comment, children, avatarImg="https://ionicframework.com/docs/img/demos/avatar.svg", middleware=(children)=>children })=>{
    return(
        <div className="profile-title-container">
            <span>
                {middleware(
                    typeof avatarImg === "object" ? <span className="rounded-circle" width="32" height="32">{avatarImg}</span> : 
                    <img src={avatarImg} alt="mdo" width="32" height="32" className="rounded-circle"/>
                )}
            </span>
            <div className="profile-title-info">
                <div className="profile-title-info-container">
                    {middleware(
                        <>
                            <span className="profile-title-username">{userName}</span>
                            <span className="profile-title-comment">{comment}</span>
                        </>
                    )}
                </div>
                <div className="profile-title-function">{children}</div>
            </div>
        </div>
    )
}

export default ProfileTitle