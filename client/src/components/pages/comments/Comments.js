import { getCommentsList, sendComment } from "../../../redux/reducers/commentsSlice/commentsReducer"
import InputControl from "../../usable-components/messages/InputControl"
import MessageBox from "../../usable-components/messages/MessageBox"
import LeftArrow from "../../usable-components/more/LeftArrow"


function Comments(){
    return(
        <>
            <LeftArrow/>
            <MessageBox type={"comments"} handle={getCommentsList}/>
            <InputControl type={"comments"} handle={sendComment}/>
        </>
    )   
}

export default Comments