import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router"


const LeftArrow = ()=>{
    const navigate = useNavigate()
    const backArrowHandle = ()=>navigate(-1)
    return(
        <div className="back-arrow">
            <p onClick={backArrowHandle}><FaArrowLeft/></p>
        </div>
    )
}

export default LeftArrow