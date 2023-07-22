import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router"


const LeftArrow = ()=>{
    const navigate = useNavigate()
    const backArrowHandle = ()=>navigate(-1)
    return(
        <div className="left-arrow-container">
            <span onClick={backArrowHandle} style={{
                cursor : "pointer",
                fontSize : "20px",
                height : "fit-content"
            }}><FaArrowLeft/></span>
        </div>
    )
}

export default LeftArrow