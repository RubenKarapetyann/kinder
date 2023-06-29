import { useEffect, useState } from "react"
import FormError from "../../../usable-components/form/FormError"
import FormInput from "../../../usable-components/form/FormInput"
import { useDispatch, useSelector } from "react-redux"
import { registerApi } from "../../../../redux/reducers/registerSlice/registerReducer"
import { useNavigate } from "react-router"
import { errorClear, errorSeter } from "../../../../redux/reducers/registerSlice/registerActions"

import "../../login/css/Login.css"

function RegisterLogic({ children }){
    const { loading, error } = useSelector(store=>store.register)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [inputData,setInputData] = useState({
        name : "",
        email : "",
        password : "",
        repeatPassword : ""
    })

    const errorCleaning = ()=>{
        if(error){
            dispatch(errorClear())
        }
    }

    useEffect(()=>{
        errorCleaning()
    },[inputData])

    const submitHandle =(e)=>{
        e.preventDefault()
        if(inputData.password.length < 8){
            dispatch(errorSeter("password cant be shorter 8 symbols"))
            return
        }else if(inputData.password !== inputData.repeatPassword){
            dispatch(errorSeter("passwords are different"))
            return
        }
        dispatch(registerApi(inputData,navigate))
    }


    const emailChange = e => setInputData(data=>({...data,email : e.target.value})) 
    const nameChange = e => setInputData(data=>({...data,name : e.target.value})) 
    const passwordChange = e => setInputData(data=>({...data,password : e.target.value})) 
    const repeatPasswordChange = e => setInputData(data=>({...data,repeatPassword : e.target.value})) 



    return(
        <div className="form-container">
            {children[0]}
            <form onSubmit={submitHandle} >

                
                <FormInput 
                    type={"text"} 
                    name={"Name"}
                    changeHandle={nameChange}
                    value={inputData.name}
                />

                <FormInput 
                    type={"email"} 
                    name={"Email"}
                    changeHandle={emailChange}
                    value={inputData.email}
                />
        
                <FormInput 
                    type={"password"} 
                    name={"Password"}
                    changeHandle={passwordChange}
                    value={inputData.password}
                />


                <FormInput 
                    type={"password"} 
                    name={"Repeat Password"}
                    changeHandle={repeatPasswordChange}
                    value={inputData.repeatPassword}
                />
                <FormError error={error}/>

                <button type="submit" className="btn btn-primary btn-block mb-4 form-btn" disabled={loading}>Sign up</button>
                {children[1]}
            </form>
        </div>
    )
}

export default RegisterLogic