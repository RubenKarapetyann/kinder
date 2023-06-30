import { useDispatch, useSelector } from "react-redux"
import FormError from "../../../usable-components/form/FormError"
import FormInput from "../../../usable-components/form/FormInput"
import LoginCheckBox from "./LoginCheckBox"
import { useEffect, useState } from "react"
import { errorClear, errorSeter } from "../../../../redux/reducers/loginSlice/loginActions"
import { useNavigate } from "react-router"
import { loginApi } from "../../../../redux/reducers/loginSlice/loginReducer"

function LoginLogic({ children }){
    const { loading, error } = useSelector(store=>store.login)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [inputData,setInputData] = useState({
        email : "",
        password : "",
        rememberMe : false
    })

    const errorCleaning = ()=>{
        if(error){
            dispatch(errorClear())
        }
    }

    useEffect(()=>{
        errorCleaning()
    },[inputData])

    const emailChange = (e)=> setInputData(data=>({...data,email : e.target.value})) 
    const passwordChange = (e)=> setInputData(data=>({...data,password : e.target.value})) 
    const rememberMeChange = (e)=> setInputData(data=>({...data,rememberMe : !data.rememberMe})) 
    const submitHandle =(e)=>{
        e.preventDefault()
        if(inputData.password.length < 8){
            dispatch(errorSeter("incorrect password"))
            return
        }
        dispatch(loginApi(inputData,navigate))
    }
    return(
        <div className="form-container">
            <form onSubmit={submitHandle}>
               
                {children[0]}
                
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
        
                <LoginCheckBox
                    value={inputData.rememberMe}
                    changeHandle={rememberMeChange} 
                />
        
                <FormError error={error}/>
                
                <button type="submit" className="btn btn-primary btn-block mb-4 form-btn" disabled={loading}>Sign in</button>
                {children[1]}
        
                
            </form>
        </div>
    )
}

export default LoginLogic