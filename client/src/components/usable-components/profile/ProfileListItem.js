import ProfileTitle from "./ProfileTitle/ProfileTitle"

const ProfileListItem = ({ children, userName, comment, hr=true, avatarImg })=>{
    return(
        <>        
            <ProfileTitle userName={userName} comment={comment} avatarImg={avatarImg}>
                <div>
                    {children}
                </div>
            </ProfileTitle>
            {hr ? <hr/> : null}
        </>
    )
}

export default ProfileListItem