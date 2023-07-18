import { useState } from "react"
import { useNavigate } from "react-router"
import FormInput from "../../../usable-components/form/FormInput"
import { useDispatch, useSelector } from "react-redux"
import { changeSettings } from "../../../../redux/reducers/settingsSlice/settingsReducer"

const Window = ({ type,title })=>{
    const placeholder = useSelector(store=>store.user.user[title])
    const [value,setValue] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const changeHandle = e =>setValue((e.target.files && e.target.files[0]) || e.target.value)
    const closeHandle = ()=>navigate(-1)

    
    const submitHandle = e =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("setting",value)
        formData.append("title",title)
        dispatch(changeSettings(navigate,formData))
    }

    return (
        <form onSubmit={submitHandle}>
            <FormInput
                placeholder={placeholder}
                // value={value}
                changeHandle={changeHandle}
                type={type}
            />
            <br/>
            <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
                <button type="submit" className="btn btn-lg btn-primary">Save changes</button>
                <button onClick={closeHandle} type="button" className="btn btn-lg btn-secondary">Close</button>
            </div> 
        </form>
    )
}
export default Window