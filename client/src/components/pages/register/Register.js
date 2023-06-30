
import FormText from "../../usable-components/form/FormText"
import FormTitle from "../../usable-components/form/FormTitle"
import RegisterLogic from "./components/RegisterLogic"


function Register(){
    return(
        <RegisterLogic>
            <FormTitle text={"Register"}/>
            <FormText text={"Already have account?"} route={"/login"} routeName={"Login"}/>
        </RegisterLogic>
    )
}

export default Register