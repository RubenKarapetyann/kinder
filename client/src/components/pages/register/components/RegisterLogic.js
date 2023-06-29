import { useState } from "react"
import FormError from "../../../usable-components/form/FormError"
import FormInput from "../../../usable-components/form/FormInput"


function RegisterLogic({ children }){
    console.log(children);
    const [inputData,setInputData] = useState({
        name : "",
        email : "",
        password : "",
        repeatPassword : ""
    })
    const [error,setError] = useState(false)


    const submitHandle =(e)=>{
        e.preventDefault()
        if(inputData.password.length < 8 && inputData.repeatPassword.length < 8){
            setError("password cant be shorter 8 symbols")
        }else if(inputData.password !== inputData.repeatPassword){
            setError("passwords are different")
        }else{
            setError(false)
        }
    }


    const emailChange = (e)=> setInputData(data=>({...data,email : e.target.value})) 
    const nameChange = (e)=> setInputData(data=>({...data,name : e.target.value})) 
    const passwordChange = (e)=> setInputData(data=>({...data,password : e.target.value})) 
    const repeatPasswordChange = (e)=> setInputData(data=>({...data,repeatPassword : e.target.value})) 
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

                {children[1]}
                {children[2]}
            </form>
        </div>
    )
}

export default RegisterLogic