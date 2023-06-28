import DropDownItemList from "./DropDownItemList"
import { FaEllipsisH } from "react-icons/fa"

const DropDown = ({ list })=>{

    return (
        <div className="dropdown text-end">
            <a href="#" className="d-block link-body-emphasis text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false"> 
                <FaEllipsisH/>
            </a>
            <DropDownItemList list={list}/>
        </div>
    )
    
}
    
export default DropDown