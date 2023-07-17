export const getHowLongItsBeen = (date)=>{
    return Math.floor((new Date().getTime() - new Date(date).getTime())/60000)
}