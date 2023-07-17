import { FRIENDS, NOT_FRIENDS, OTHER_SEND, YOU_SEND } from "../constants/user-status-constants.js"

export const getUserStatus = (otherToUser,UserToOther,friendsList,otherId)=> {
    const inOTherList = UserToOther.find(user=>user.id === otherId)
    if(inOTherList){
        return YOU_SEND
    }
    const inUserList = otherToUser.find(user=>user.id === otherId)
    if(inUserList){
        return OTHER_SEND
    }
    const inFriendList = friendsList.find(user=>user.friendId === otherId)
    if(inFriendList){
        return FRIENDS
    }
    return NOT_FRIENDS
}