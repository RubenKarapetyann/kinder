import { useSelector } from "react-redux"
import ProfileListItem from "../../usable-components/profile/ProfileListItem"

function Messages(){
    const { messages, loading } = useSelector(store=>store.messages)

    return (
        <>
            <ProfileListItem userName={"Ruben"} comment={"hello Nick!"}>
                <span>5 min ago</span>
            </ProfileListItem>
        </>
    )
}

                

export default Messages