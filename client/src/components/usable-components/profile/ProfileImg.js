import { Link } from "react-router-dom"

const ProfileImg = ({ route })=>{
    return (
        <Link 
            href={route} 
            className="d-block link-body-emphasis text-decoration-none dropdown-toggle" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
        >
            <img 
                src="https://ionicframework.com/docs/img/demos/avatar.svg" 
                alt="mdo" 
                width="32" 
                height="32" 
                className="rounded-circle"
            />
        </Link>
    )
}
export default ProfileImg