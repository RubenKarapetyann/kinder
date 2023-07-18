import ProfileTitle from "../../profile/ProfileTitle/ProfileTitle"
import "./Message.css"

const Message = ({ other=true, text, avatarImg, userName })=>{
    const className = other ? "other" : "you"
    return(
        <div className={"chat-message-container-"+className}>
            <div className="chat-sender-info">
           
                {other ? <ProfileTitle userName={userName} avatarImg={avatarImg}/> : 
                    <>
                        <span className="profile-title-username" style={{
                            marginRight : "5px",
                            fontWeight: "600"
                        }}>{"you"}</span>
                        <ProfileTitle avatarImg={avatarImg}/>
                    </>
                    
                }
            </div>
            <div className={"chat-message-"+className}>
                <span className="chat-message-text">{text}</span>
            </div>
        </div>
    )
}

export default Message