const FormInput = ({ name, type, value, changeHandle, placeholder })=>{
    return(
        <div className="form-outline mb-4">
            <label className="form-label" htmlFor={name}>{name}</label>
            <input 
                type={type}
                id={name} 
                className="form-control" 
                required
                value={value}
                onChange={changeHandle}
                placeholder={placeholder}
            />
        </div>
    )
}

export default FormInput