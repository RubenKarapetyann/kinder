import "./ProfileTitle.css"

const ProfileTitle = ({ userName, comment="", children, type, avatarImg="https://ionicframework.com/docs/img/demos/avatar.svg", middleware=(children)=>children })=>{
    comment = (type==="messages") && comment.length >=10 ? comment.slice(0,10) + "..." : comment
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
                            {comment && <span className="profile-title-comment">{comment}</span>}
                        </>
                    )}
                </div>
                {children && <div className="profile-title-function">{children}</div>}
            </div>
        </div>
    )
}

export default ProfileTitle