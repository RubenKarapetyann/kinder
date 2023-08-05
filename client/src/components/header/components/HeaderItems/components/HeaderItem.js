import { NavLink } from "react-router-dom"

const HeaderItem = ({ icon, route, displayName, notViewed })=>{
    return (
        <li>
            <NavLink to={route} className="nav-link px-2 link-secondary">
                <span className="header-item-container">
                    <span>{icon}</span>
                    <span style={{
                        fontSize : "11px"
                    }}>{displayName}</span>
                    {!!notViewed && <span className="not-viewed-header-container">{notViewed}</span>}
                </span>
            </NavLink>
        </li>
    )
}
 


export default HeaderItem