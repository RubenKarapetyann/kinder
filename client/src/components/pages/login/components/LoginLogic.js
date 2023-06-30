import FormError from "../../../usable-components/form/FormError"
import FormInput from "../../../usable-components/form/FormInput"
import LoginCheckBox from "./LoginCheckBox"
import { useState } from "react"

function LoginLogic({ children }){
    const [inputData,setInputData] = useState({
        email : "",
        password : "",
        rememberMe : false
    })
    const [error,setError] = useState(false)
    const emailChange = (e)=> setInputData(data=>({...data,email : e.target.value})) 
    const passwordChange = (e)=> setInputData(data=>({...data,password : e.target.value})) 
    const rememberMeChange = (e)=> setInputData(data=>({...data,rememberMe : !data.rememberMe})) 
    const submitHandle =(e)=>{
        e.preventDefault()
        if(inputData.password.length < 8){
            setError("incorrect password")
        }
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
                
                <button type="submit" className="btn btn-primary btn-block mb-4 form-btn">Sign in</button>
                {children[1]}
        
                
            </form>
        </div>
    )
}

export default LoginLogic