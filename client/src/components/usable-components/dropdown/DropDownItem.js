import { Link } from "react-router-dom"

const DropDownItem = ({ name, route, hr, icon=null })=>{

    if(hr){
        return <li><hr className="dropdown-divider"/></li> 
    }

    return (
        <li>
            <Link className="dropdown-item" to={route}>{icon}<span style={{
                marginLeft : "13px"
            }}>{name}</span></Link>
        </li>
    )
    
}
    
export default DropDownItem