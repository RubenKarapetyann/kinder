import ProfileTitle from "./ProfileTitle/ProfileTitle"

const ProfileListItem = ({ children, userName, comment, hr=true, avatarImg, middleware, type })=>{
    return(
        <>        
            <ProfileTitle userName={userName} comment={comment} avatarImg={avatarImg} middleware={middleware} type={type}>
                <div style={{
                    display : "flex",
                    gap : 5
                }}>
                    {children}
                </div>
            </ProfileTitle>
            {hr ? <hr/> : null}
        </>
    )
}

export default ProfileListItem