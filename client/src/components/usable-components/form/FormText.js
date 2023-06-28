import { Link } from "react-router-dom"

const FormText = ({ text, route, routeName })=>{
    return(
        <div className="text-center">
            <p>{text} <Link to={route}>{routeName}</Link></p>
        </div>
    )
}

export default FormText