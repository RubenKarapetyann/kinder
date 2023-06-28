const AnyText = ({ divClass, pClass, text })=>{
    return (
        <div className={divClass}>
            <p className={pClass}>{text}</p>
        </div>
    )
}
export default AnyText