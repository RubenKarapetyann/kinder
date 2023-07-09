import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import userReducer from "../reducers/userSlice/UserReducer"
import registerReducer from "../reducers/registerSlice/registerReducer"
import loginReducer from "../reducers/loginSlice/loginReducer"
import homeReducer from "../reducers/homeSlice/homeReducer"
import messagesReducer from "../reducers/messagesSlice/messagesReducer"
import commentsReducer from "../reducers/commentsSlice/commentsReducer"
import chatReducer from "../reducers/chatSlice/chatReducer"
import notificationsReducer from "../reducers/notificationsSlice/notificationsReducer"
import profileReducer from "../reducers/profileSlice/profileReducer"
import friendsReducer from "../reducers/friendsSlice/friendsReducer"
import addFriendReducer from "../reducers/addFriendSlice/addFriendReducer"




const rootReducer = combineReducers({
    user : userReducer,
    register : registerReducer,
    login : loginReducer,
    home : homeReducer,
    messages : messagesReducer,
    comments : commentsReducer,
    chat : chatReducer,
    notifications : notificationsReducer,
    profile : profileReducer,
    friends : friendsReducer,
    addfriend : addFriendReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk))

export default store