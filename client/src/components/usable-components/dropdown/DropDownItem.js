import { Link } from "react-router-dom"

const DropDownItem = ({ name, route, hr })=>{

    if(hr){
        return <li><hr className="dropdown-divider"/></li> 
    }

    return (
        <li>
            <Link className="dropdown-item" to={route}>{name}</Link>
        </li>
    )
    
}
    
export default DropDownItem