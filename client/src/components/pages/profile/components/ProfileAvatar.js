const ProfileAvatar = ({ avatarImg })=>{
    return (
        <div className="profile-avatar">
            <img 
                    src={avatarImg}
                    alt="mdo" 
                    width={100} 
                    height={100} 
                    className="rounded-circle"
                />
        </div>
    )
}

export default ProfileAvatar