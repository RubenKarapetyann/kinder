import { NavLink } from "react-router-dom"

const HeaderItem = ({ icon, route, name })=>{
    console.log(icon);
    return (
        <li>
            <NavLink to={route} className="nav-link px-2 link-secondary">
                {icon}
            </NavLink>
        </li>
    )
}
 


export default HeaderItem