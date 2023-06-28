const FormInput = ({ name, type, value, changeHandle })=>{
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
            />
        </div>
    )
}

export default FormInput