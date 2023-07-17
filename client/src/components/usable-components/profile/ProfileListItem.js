import ProfileTitle from "./ProfileTitle/ProfileTitle"

const ProfileListItem = ({ children, userName, comment, hr=true, avatarImg, middleware })=>{
    return(
        <>        
            <ProfileTitle userName={userName} comment={comment} avatarImg={avatarImg} middleware={middleware}>
                <div>
                    {children}
                </div>
            </ProfileTitle>
            {hr ? <hr/> : null}
        </>
    )
}

export default ProfileListItem