import DropDownItemList from "./DropDownItemList"
import { FaEllipsisH } from "react-icons/fa"

const DropDown = ({ list, icon=true })=>{

    return (
        <div className="dropdown text-end">
            <a href="#" className="d-block link-body-emphasis text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false"> 
                {icon && <FaEllipsisH/>}
            </a>
            <DropDownItemList list={list}/>
        </div>
    )
    
}
    
export default DropDown