export const getHowLongItsBeen = (date)=>{
    const minutes = Math.floor((new Date().getTime() - new Date(date).getTime())/60000)
    const hours = Math.floor((new Date().getTime() - new Date(date).getTime())/(60000*60))
    const days = Math.floor((new Date().getTime() - new Date(date).getTime())/(60000*60*24))
    const time = minutes < 60 ? minutes+" min" : hours < 24 ? hours+" hour" : days+" day"
    return (
        <span>{time} ago</span>
    )
}