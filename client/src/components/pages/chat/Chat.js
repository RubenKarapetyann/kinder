import { getChatList } from "../../../redux/reducers/chatSlice/chatReducer"
import InputControl from "../../usable-components/messages/InputControl"
import MessageBox from "../../usable-components/messages/MessageBox"

function Chat(){
    return(
        <>
            <MessageBox type={"chat"} handle={getChatList}/>
            <InputControl type={"chat"}/>
        </> 
    )
}

export default Chat