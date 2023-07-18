import { Link } from "react-router-dom"

const ProfileImg = ({ route, side=32, avatarImg })=>{
    return (
        <Link 
            to={route} 
            className="d-block link-body-emphasis text-decoration-none dropdown-toggle" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
        >
            <img 
                src={avatarImg}
                alt="mdo" 
                width={side} 
                height={side} 
                className="rounded-circle"
            />
        </Link>
    )
}
export default ProfileImg