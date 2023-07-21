const ProfileTab = ({ icon, active, activeHandle, activeName })=>{
    const handle = () => activeHandle(activeName)
    return (
        <div style={
            active ? {
                color : "black",
                borderBottom : "2px solid black"
            } : null
        }
        onClick={handle}
        >
            {icon}
        </div>
    )
}

export default ProfileTab