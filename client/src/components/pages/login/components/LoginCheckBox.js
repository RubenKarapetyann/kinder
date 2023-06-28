const LoginCheckBox = ()=>{
    return(
        <div className="row mb-4">
            <div className="col-md-4 d-flex justify-content-center">
                <div className="form-check mb-3 mb-md-0">
                    <input className="form-check-input" type="checkbox" value="" id="loginCheck"/>
                    <label className="form-check-label" for="loginCheck"> Remember me </label>
                </div>
            </div>
        </div>
    )
}

export default LoginCheckBox