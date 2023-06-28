import "./css/Login.css"
import FormInput from "../../usable-components/form/FormInput"
import LoginCheckBox from "./components/LoginCheckBox"
import FormText from "../../usable-components/form/FormText"
import FormTitle from "../../usable-components/form/FormTitle"

function Login(){
    return(
        <div className="form-container">
            <FormTitle text={"Login"}/>
            <form>
                
                <FormInput type={"email"} name={"Email"}/>
        
                <FormInput type={"password"} name={"Password"}/>
        
                <LoginCheckBox/>
        
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