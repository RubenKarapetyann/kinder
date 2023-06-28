import "./css/Login.css"
import FormInput from "../../usable-components/form/FormInput"
import LoginCheckBox from "./components/LoginCheckBox"
import FormText from "../../usable-components/form/FormText"
import FormTitle from "../../usable-components/form/FormTitle"
import { useState } from "react"

function Login(){
    const [inputData,setInputData] = useState({
        email : "",
        password : "",
        rememberMe : false
    })
    const emailChange = (e)=> setInputData(data=>({...data,email : e.target.value})) 
    const passwordChange = (e)=> setInputData(data=>({...data,password : e.target.value})) 
    const rememberMeChange = (e)=> setInputData(data=>({...data,rememberMe : !data.rememberMe})) 
    return(
        <div className="form-container">
            <FormTitle text={"Login"}/>
            <form>
                
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
        
                <button type="submit" className="btn btn-primary btn-block mb-4 form-btn">Sign in</button>
        
                <FormText text={"Not a member?"} route={"/register"} routeName={"Register"}/>
            </form>
        </div>
    )
}


{/* <div className="tab-content">
<div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
</div>
</div> */}

export default Login