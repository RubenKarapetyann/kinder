const getMessages = (currentUser,currentChat,id,chatId)=>{
    const lastMessage = currentChat.messages.length >= 1 ? currentChat.messages[currentChat.messages.length-1] : undefined
    let dontWathcedCount = 0
    for ( let i = currentChat.messages.length-1 ; i >= 0 ; i-- ){
        if( currentChat.messages[i].watchers[id] ){
            break
        }
        dontWathcedCount++
        if( dontWathcedCount >= 99 ){
            break
        }
    }

    return {
        sender : {
            id: currentUser.id,
            userName: currentUser.userName,
            avatarImg: currentUser.avatarImg
        },
        lastMessage : lastMessage ? {
            text : lastMessage.text,
            autherId : lastMessage.autherId,
            id : lastMessage.id,
            sendDate : lastMessage.sendDate,
            watched : !!lastMessage.watchers[id]
        } : {},
        chatId,
        dontWathcedCount    
    }
}

export default getMessages