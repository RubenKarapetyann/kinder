import { useState } from "react"
import FormError from "../../usable-components/form/FormError"
import FormInput from "../../usable-components/form/FormInput"
import FormText from "../../usable-components/form/FormText"
import FormTitle from "../../usable-components/form/FormTitle"

function Register(){
    const [inputData,setInputData] = useState({
        name : "",
        email : "",
        password : "",
        repeatPassword : ""
    })
    return(
        <div className="form-container">
            <FormTitle text={"Register"}/>
            <form >
                
                <FormInput 
                    type={"text"} 
                    name={"Name"}
                    // changeHandle={emailChange}
                    value={inputData.name}
                />

                <FormInput 
                    type={"email"} 
                    name={"Email"}
                    // changeHandle={emailChange}
                    value={inputData.email}
                />
        
                <FormInput 
                    type={"password"} 
                    name={"Password"}
                    // changeHandle={passwordChange}
                    value={inputData.password}
                />


                <FormInput 
                    type={"password"} 
                    name={"Repeat Password"}
                    // changeHandle={passwordChange}
                    value={inputData.repeatPassword}
                />
                <FormError />
    
                
                <button type="submit" className="btn btn-primary btn-block mb-4 form-btn">Sign up</button>
        
                <FormText text={"Already have account?"} route={"/login"} routeName={"Login"}/>
            </form>
        </div>
    )
}//onSubmit={submitHandle} error={error}

export default Register