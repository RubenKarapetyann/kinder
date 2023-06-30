import "./css/Login.css"
import FormText from "../../usable-components/form/FormText"
import FormTitle from "../../usable-components/form/FormTitle"
import LoginLogic from "./components/LoginLogic"

function Login(){
    return(
        <LoginLogic>
            <FormTitle text={"Login"}/>
            <FormText text={"Not a member?"} route={"/register"} routeName={"Register"}/>
        </LoginLogic>
    )
}


{/* <div className="tab-content">
<div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
</div>
</div> */}

export default Login