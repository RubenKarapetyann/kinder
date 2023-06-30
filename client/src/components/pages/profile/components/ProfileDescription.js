import AnyText from "../../../usable-components/more/AnyText"
import ProfileInfoBoard from "../components/ProfileInfoBoard"

const ProfileDescription = ()=>{
    return(
        <>
            <div class="profile-row">
            <div class="profile-avatar">
            <img 
                    src="https://ionicframework.com/docs/img/demos/avatar.svg" 
                    alt="mdo" 
                    width={100} 
                    height={100} 
                    className="rounded-circle"
                />
            </div>
            <div class="profile-info-friends-posts">

                <ProfileInfoBoard text={15} comment={"posts"}/>

                <ProfileInfoBoard text={20} comment={"follow"}/>
            </div>
            </div>
            <div class="profile-row">
            <div class="profile-description">
                <h3>user_name</h3>
                <AnyText pClass={"profile-description-text"} text={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non perspiciatis aliquam temporibus ab laborum animi assumenda, repellat natus nemo perferendis?"}/>
            </div>
            </div>
        </>
    )
}
export default ProfileDescription