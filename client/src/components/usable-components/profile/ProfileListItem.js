import ProfileTitle from "./ProfileTitle/ProfileTitle"

const ProfileListItem = ({ children, userName, comment })=>{
    return(
        <>        
            <ProfileTitle userName={userName} comment={comment}>
                <div>
                    {children}
                </div>
            </ProfileTitle>
            <hr/>
        </>
    )
}

export default ProfileListItem