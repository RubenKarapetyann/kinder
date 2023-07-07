import AnyText from "../../../usable-components/more/AnyText"


const ProfileInfo = ({ userName, description })=>{
    return (
        <div className="profile-row">
            <div className="profile-description">
                <h3>{userName}</h3>
                <AnyText pClass={"profile-description-text"} text={description}/>
            </div>
        </div>
    )
}

export default ProfileInfo