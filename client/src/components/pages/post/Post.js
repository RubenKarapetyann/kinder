import { useEffect } from "react"
import { useParams } from "react-router"

function Post (){
    const { id } = useParams()

    useEffect(()=>{

    },[])

    return (
        <>{id}</>
    )
}

export default Post