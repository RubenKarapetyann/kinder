import { useNavigate } from "react-router"
import "./WindowWithCloseButton.css"

const WindowWithCloseButton = ({ children, title }) =>{
    const navigate = useNavigate()
    const closeHandle = ()=>navigate(-1)
    return (
        <div className="window-background">
            <div className="modal-content rounded-4 shadow window-container">
                <div className="modal-header border-bottom-0">
                    <h1 className="modal-title fs-5">{title}</h1>
                    <button onClick={closeHandle} type="button" className="btn-close" aria-label="Close"></button>
                </div>
                <br/>
                {children}
            </div>
        </div>
    )
}

export default WindowWithCloseButton