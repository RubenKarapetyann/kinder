import "./css/Login.css"
import FormInput from "../../usable-components/form/FormInput"

function Login(){
    return(
        <div className="form-container">
            <h1 className="title">Login</h1>
            <div className="tab-content">
                <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <form>
                        
                        <FormInput type={"email"} name={"Email"}/>
                
                        <FormInput type={"password"} name={"Password"}/>
                
                        <div className="row mb-4">
                            <div className="col-md-4 d-flex justify-content-center">
                                <div className="form-check mb-3 mb-md-0">
                                    <input className="form-check-input" type="checkbox" value="" id="loginCheck" checked/>
                                    <label className="form-check-label" for="loginCheck"> Remember me </label>
                                </div>
                            </div>
                        </div>
                
                        <button type="submit" className="btn btn-primary btn-block mb-4 form-btn">Sign in</button>
                
                        <div className="text-center">
                            <p>Not a member? <a href="#">Register</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login