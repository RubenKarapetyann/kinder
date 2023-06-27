import { Link } from "react-router-dom"
import { HOME } from "../../../../constants/routes-constants"

const HeaderLogo = ()=>{
    return (
        <Link to={HOME} className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
            <p className="logo">KIN<span className="der">DER</span></p>
        </Link>
    )
}

export default HeaderLogo