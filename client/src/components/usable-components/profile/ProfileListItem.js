import ProfileTitle from "./ProfileTitle/ProfileTitle"

const ProfileListItem = ({ children, userName, comment, hr=true })=>{
    return(
        <>        
            <ProfileTitle userName={userName} comment={comment}>
                <div>
                    {children}
                </div>
            </ProfileTitle>
            {hr ? <hr/> : null}
        </>
    )
}

export default ProfileListItem