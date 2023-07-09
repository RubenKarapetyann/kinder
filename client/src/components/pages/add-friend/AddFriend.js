import { useEffect } from "react"
import Friend from "./components/Friend"
import { useSelector } from "react-redux"

function AddFriend(){
    const { list, loading } = useSelector(store=>store.addFriend)

    useEffect(()=>{

    },[])

 

    if(loading){return<p>loading...</p>}
    return (
        <p>
            <Friend userName={"Ruben"}/>
        </p>
    )
}

                

export default AddFriend