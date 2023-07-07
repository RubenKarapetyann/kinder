import AnyText from "../../../usable-components/more/AnyText"


const ProfileInfo = ()=>{
    return (
        <div className="profile-row">
            <div className="profile-description">
                <h3>user_name</h3>
                <AnyText pClass={"profile-description-text"} text={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non perspiciatis aliquam temporibus ab laborum animi assumenda, repellat natus nemo perferendis?"}/>
            </div>
        </div>
    )
}

export default ProfileInfo