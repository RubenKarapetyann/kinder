import express from "express"
import { REGISTER, LOGIN, AUTH, LOG_OUT, HOME, MESSAGES, COMMENTS, POST_COMMENTS, CHAT, NOTIFICATIONS, NEW_POST, PROFILE, FRIENDS, POST, ADD_FRIEND, SETTINGS } from "./constants/routes-constants.js"
import jwt from "jsonwebtoken"
import passport from "passport"
import passportJWT from "passport-jwt"
import bcrypt from "bcrypt"
import fs from "fs"
import { NOTIFICATIONS_TYPES } from "./constants/notifications-constants.js"
import multer from "multer"
import http from "http"
import { Server } from "socket.io" 
import { NOT_FRIENDS, OTHER_SEND, USER_STATUS_TRANSFORM, YOU_SEND } from "./constants/user-status-constants.js"
import { getUserStatus } from "./utils/getUserStatus.js"



const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./database/images");
    },
    filename: (req, file, cb) =>{
        cb(null, `${Math.random()}_${new Date().getTime()}.jpg`);
    }
});

const upload = multer({ storage : storageConfig })


const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

const { Strategy:JwtStrategy, ExtractJwt } = passportJWT
const jwtConfig = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SESSION_SECRET
}
const generateToken = (user)=> {
    const payload = {
        sub : user.id
    }

    const token = jwt.sign(payload, jwtConfig.secretOrKey)
    return token
}


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(express.static("./database/images"))
app.use('/comments', express.static('./database/images'));
app.use('/profile', express.static('./database/images'));
app.use('/post', express.static('./database/images'));
app.use(SETTINGS, express.static('./database/images'));
app.use(MESSAGES, express.static('./database/images'));

passport.use(new JwtStrategy(jwtConfig,(payload, done)=>{
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
    const user = users[payload.sub]

    if(user){
        return done(null, user)
    }else{
        return done(null,false)
    }
}));


app.post(REGISTER,async (req,res)=>{
    try{
        const {email, name, password} = req.body
        const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
        const user = Object.values(users).find(val=>val.email===email)
        if(!user){
            const hashedPassword = await bcrypt.hash(password, 10)
            const id = Math.random()
            const newUser = {
                userName : name,
                email : email,
                avatarImg : "https://ionicframework.com/docs/img/demos/avatar.svg",
                password : hashedPassword,
                description : "no bio yet",
                id,
                posts : [],
                friends : [],
                favorites : [],
                notifications : [],
                friendRequests : {
                    meToOther : [],
                    otherToMe : []
                }
            }
            users[id] = newUser
            fs.writeFileSync("./database/users.json", JSON.stringify(users,undefined,2));
            res.send({access : true})
        }else{
            res.send({access : false,message : "email already used"})
        }
    }catch(err){
        res.status(400).send({access : false,message : "something went wrong"})
    }
})

app.post(LOGIN,async (req,res)=>{
    const { email, password } = req.body
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
    const user = Object.values(users).find(val=>val.email===email)


    if(!user){
        return res.send({access : false, message : "incorrect email"})
    }

    const validPassword = await bcrypt.compare(password,user.password)
    if(!validPassword){
        return res.send({access : false, message : "incorrect password"})
    }

    const token = generateToken(user)

    res.send({access : true, token, user : { 
        name : user.userName,
        email : user.email,
        id : user.id,
        avatarImg : user.avatarImg,
        description : user.description
    }})
})


app.get(LOG_OUT,(req,res)=>{
    req.headers.authorization = null
    res.send({
        access : true
    })
})


app.get(HOME, passport.authenticate("jwt", {session : false}), (req,res)=>{
    const user = req.user
    const posts = JSON.parse(fs.readFileSync('./database/posts.json',{ encoding: 'utf8', flag: 'r' }))
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))

    const userPosts = user.posts.map(post=>{
        const currentPost = posts[post.postId]
        const currentUser = users[currentPost.auther.id]
        return ({
            postDescription : currentPost.postDescription, 
            id : currentPost.id,
            img : currentPost.img,
            likes : currentPost.likes,
            liked : currentPost.likers[user.id],
            publicDate : currentPost.publicDate,
            auther : {
                id : currentUser.id,
                userName : currentUser.userName,
                avatarImg : currentUser.avatarImg
            },
            favorite : !!user.favorites.find(val=>val===post.postId)
    })})

    const friendsPost = user.friends.reduce((state,friend)=>{
        return state.concat(...users[friend.friendId].posts.map(post=>{
            const currentPost = posts[post.postId]
            const currentUser = users[currentPost.auther.id]
            return ({
                postDescription : currentPost.postDescription, 
                id : currentPost.id,
                img : currentPost.img,
                likes : currentPost.likes,
                liked : currentPost.likers[user.id],
                publicDate : currentPost.publicDate,
                auther : {
                    id : currentUser.id,
                    userName : currentUser.userName,
                    avatarImg : currentUser.avatarImg
                },
                favorite : !!user.favorites.find(val=>val===post.postId)
        })}))
    },[])
    

    res.send({
        access : true,
        posts : [...userPosts,...friendsPost]
    })
})



app.post(HOME, passport.authenticate("jwt", {session : false}), (req,res)=>{
    const user = req.user
    const { postId, type } = req.body
    const posts = JSON.parse(fs.readFileSync('./database/posts.json',{ encoding: 'utf8', flag: 'r' }))
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))

    const post = posts[postId]

    if(type === "like"){
        if(post.likers[user.id]){
            post.likers[user.id] = false
            post.likes--
        }else{
            post.likers[user.id] = true
            post.likes++
            users[post.auther.id].notifications = [...users[post.auther.id].notifications, {
                id : Math.random(),
                autherId : user.id,
                date : new Date().getTime(),
                type : "like"
            }]
        }
    }else{
        const currentUser = users[user.id]
        const post = currentUser.favorites.find(val=>val === postId)
        if(post){
            currentUser.favorites = currentUser.favorites.filter(val=>val!==postId)
        }else{
            currentUser.favorites.push(postId)
        }
        users[user.id] = currentUser
    }
    fs.writeFileSync("./database/users.json", JSON.stringify(users,undefined,2));
    fs.writeFileSync("./database/posts.json", JSON.stringify(posts,undefined,2));


    const currentUser = users[user.id]
    const backPost = {
        postDescription : post.postDescription, 
        id : post.id,
        img : post.img,
        likes : post.likes,
        liked : post.likers[user.id],
        publicDate : post.publicDate,
        auther : {
            id : currentUser.id,
            userName : currentUser.userName,
            avatarImg : currentUser.avatarImg
        },
        favorite : !!currentUser.favorites.find(val=>val===post.id)
    }

    res.send({
        access : true,
        post : backPost
    })
})


app.get(MESSAGES,passport.authenticate("jwt", {session : false}),(req,res)=>{
    const { id, friends  } = req.user
    const messages = JSON.parse(fs.readFileSync('./database/messages.json',{ encoding: 'utf8', flag: 'r' }))
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))

    const messagesList = friends.map(friend=>{
        const currentChat = messages[friend.chatId]
        const { id:currentUserId } = currentChat.members.find(val=>val.id===friend.friendId)
        const currentUser = users[currentUserId]
        return {
            sender : {
                id: currentUserId,
                userName: currentUser.userName,
                avatarImg: currentUser.avatarImg
            },
            lastMessage : currentChat.messages[currentChat.messages.length-1] || {},
            chatId : friend.chatId
        }
    })

    res.send({
        access : true,
        messagesList
    })
})


app.get(COMMENTS,passport.authenticate("jwt", {session : false}),(req,res)=>{
    const { id:postId } = req.params
    // const { id, friends  } = req.user
    const posts = JSON.parse(fs.readFileSync('./database/posts.json',{ encoding: 'utf8', flag: 'r' }))
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))

    const comments = posts[postId].comments.map(comment=>{
        const currentUser = users[comment.autherId]
        return {
            ...comment,
            avatarImg : currentUser.avatarImg,
            userName : currentUser.userName,
        }
    })

    res.send({
        access : true,
        list : comments
    })
})


app.post(POST_COMMENTS,passport.authenticate("jwt", {session : false}),(req,res)=>{
    const { id, avatarImg, userName } = req.user
    const { comment,postId } = req.body
    const posts = JSON.parse(fs.readFileSync('./database/posts.json',{ encoding: 'utf8', flag: 'r' }))
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))

    const newComment = {
        text: comment,
        autherId: id,
        likes: 0,
        id : `comment_${Math.random()}`
    }

    const post = posts[postId]
    post.comments.push(newComment)
    users[post.auther.id].notifications = [...users[post.auther.id].notifications, {
        id : `notification_${Math.random()}`,
        autherId : id,
        date : new Date().getTime(),
        type : "comment"
    }]
    fs.writeFileSync("./database/posts.json", JSON.stringify(posts,undefined,2));
    fs.writeFileSync("./database/users.json", JSON.stringify(users,undefined,2));

    res.send({
        access : true,
        comment : {
            ...newComment,
            avatarImg,
            userName
        }
    })
})



app.get(CHAT,passport.authenticate("jwt", {session : false}),(req,res)=>{
    const { id:chatId } = req.params
    const chat = JSON.parse(fs.readFileSync('./database/messages.json',{ encoding: 'utf8', flag: 'r' }))
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))

    const messages = chat[chatId].messages.map(message=>{
        const currentUser = users[message.autherId]
        return {
            ...message,
            avatarImg : currentUser.avatarImg,
            userName : currentUser.userName,
        }
    })


    res.send({
        access : true,
        list : messages
    })
})

app.get(NOTIFICATIONS,passport.authenticate("jwt", {session : false}),(req,res)=>{
    const user = req.user
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))

    const notifications = user.notifications.map(notification=>{
        const currentUser = users[notification.autherId]
        return {
            ...notification,
            avatarImg : currentUser.avatarImg,
            userName : currentUser.userName ,
            text : NOTIFICATIONS_TYPES[notification.type]
        }
    })

    res.send({
        access : true,
        list : notifications
    })
})


app.post(NEW_POST,passport.authenticate("jwt", {session : false}),upload.single("file"),(req,res)=>{
    const user = req.user

    const posts = JSON.parse(fs.readFileSync('./database/posts.json',{ encoding: 'utf8', flag: 'r' }))
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))


    const postId = `post_${Math.random()}`
    posts[postId] = {
        postDescription: req.body.description,
        id: postId,
        img: req.file.filename,
        likes: 0,
        likers: {},
        publicDate: new Date().getTime(),
        auther: {
            id: user.id
        },
        comments: []  
    }
    users[user.id].posts.push({postId})

    fs.writeFileSync("./database/posts.json", JSON.stringify(posts,undefined,2));
    fs.writeFileSync("./database/users.json", JSON.stringify(users,undefined,2));

    res.send({
        access : true
    })
})


app.get(PROFILE,passport.authenticate("jwt", {session : false}),(req,res)=>{
    const posts = JSON.parse(fs.readFileSync('./database/posts.json',{ encoding: 'utf8', flag: 'r' }))
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
    const { id } = req.params
    const user = req.user


    const isFriend = user.friends.find(friend=>friend.friendId === id) || id === user.id
    const currentUser = users[id]
    const profile = {
        auther : {
            id : currentUser.id,
            userName : currentUser.userName,
            avatarImg : currentUser.avatarImg,
            description : currentUser.description,
            friendsCount : currentUser.friends.length,
            postsCount : currentUser.posts.length
        },
        posts : isFriend ? currentUser.posts.map(post=>({
            postId : post.postId,
            img : posts[post.postId].img
        })) : []
    }

    res.send({
        access : true,
        profile
    })
})

app.get(FRIENDS,passport.authenticate("jwt", {session : false}),(req,res)=>{
    const user = req.user
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))


    const friends = users[user.id].friends.map(friend=>{
        const currentFriend = users[friend.friendId]
        return ({
            id : friend.friendId,
            avatarImg : currentFriend.avatarImg,
            userName : currentFriend.userName,
            chatId : friend.chatId
        })
    })

    res.send({
        access : true,
        list : friends
    })
})

app.delete(FRIENDS+"/:id",passport.authenticate("jwt", {session : false}),(req,res)=>{
    const { id } = req.params
    const { id:userId } = req.user
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
    const chat = JSON.parse(fs.readFileSync('./database/messages.json',{ encoding: 'utf8', flag: 'r' }))
    
    let chatId 
    users[userId].friends = users[userId].friends.filter(friend=>friend.friendId===id ? (chatId=friend.chatId) && false : true)
    users[id].friends = users[id].friends.filter(friend=>friend.friendId!==userId)
    delete chat[chatId]



    fs.writeFileSync("./database/users.json", JSON.stringify(users,undefined,2));
    fs.writeFileSync("./database/messages.json", JSON.stringify(chat,undefined,2));

    res.send({
        access : true
    })
})

app.get(POST,passport.authenticate("jwt", {session : false}),(req,res)=>{
    const { id } = req.params
    const user = req.user
    const posts = JSON.parse(fs.readFileSync('./database/posts.json',{ encoding: 'utf8', flag: 'r' }))
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
    const currentPost = posts[id]
    const currentUser = users[currentPost.auther.id]

    const post = {
        postDescription : currentPost.postDescription, 
        id : currentPost.id,
        img : currentPost.img,
        likes : currentPost.likes,
        liked : currentPost.likers[user.id],
        publicDate : currentPost.publicDate,
        auther : {
            id : currentUser.id,
            userName : currentUser.userName,
            avatarImg : currentUser.avatarImg
        },
        favorite : !!user.favorites.find(val=>val===currentPost.id)
    }

    res.send({
        access : true,
        post
    })
})

app.get(AUTH,passport.authenticate("jwt", {session : false}),(req,res)=>{
    res.send({
        isAuth : true,
        name : req.user.userName,
        email : req.user.email,
        id : req.user.id,
        avatarImg : req.user.avatarImg,
        description : req.user.description
    })
})


io.on("connection",(socket)=>{
    console.log("user connected")
    const { roomId } = socket.handshake.query
    socket.roomId = roomId
    socket.join(roomId)

    const sendMessage = (message)=>{
        io.in(socket.roomId).emit('message:add', message)
    }

    const addMessage = (message)=>{
        const chat = JSON.parse(fs.readFileSync('./database/messages.json',{ encoding: 'utf8', flag: 'r' }))
        const newMessage = {
            text : message.text,
            autherId : message.autherId,
            id : `${Math.random()}-"message"`,
            sendDate : new Date().getTime()
        }
        chat[roomId].messages.push(newMessage)
        sendMessage(newMessage)
        fs.writeFileSync("./database/messages.json", JSON.stringify(chat,undefined,2));
    }

    // socket.on('message:get', getMessages)
    socket.on('message:add', addMessage)
    // socket.on('message:remove', removeMessage)

    socket.on('disconnect', () => {
        console.log('User disconnected')
        socket.leave(roomId)
    })
})

app.get(ADD_FRIEND,passport.authenticate("jwt", {session : false}),(req,res)=>{
    const user = req.user
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
    let filteredList  = []
    const search = req.query.search

    if(search === ""){
        filteredList = user.friendRequests.otherToMe.map(user=>{
            const currentUser = users[user.id]
            return { 
                id : currentUser.id,
                avatarImg : currentUser.avatarImg,
                userName : currentUser.userName,
                status : OTHER_SEND
            }
        })
        return res.send({
            access : true,
            list : filteredList
        })
    }

    for (let i in users){
        if(new RegExp(search,"i").test(users[i].userName) && user.id !== users[i].id){
            const currentUser = users[i]
            const status = getUserStatus(user.friendRequests.otherToMe,user.friendRequests.meToOther,user.friends,currentUser.id)
            filteredList.push({
                id : currentUser.id,
                avatarImg : currentUser.avatarImg,
                userName : currentUser.userName,
                status
            })
        }
    }
    res.send({
        access : true,
        list : filteredList
    })

})



app.post(ADD_FRIEND,passport.authenticate("jwt", {session : false}),(req,res)=>{
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
    const currentUser = users[req.user.id]
    const otherUser = users[req.body.id]
    const currentDate = new Date().getTime()


    if(req.body.status === NOT_FRIENDS){
        otherUser.notifications.push({
            id: Math.random(),
            autherId: currentUser.id,
            date: currentDate,
            type: "friend-requests"
        })
        otherUser.friendRequests.otherToMe.push({
            id : currentUser.id,
            date : currentDate
        })
        currentUser.friendRequests.meToOther.push({
            id : otherUser.id,
            date : currentDate
        })
    }else if(req.body.status === OTHER_SEND){
        const chat = JSON.parse(fs.readFileSync('./database/messages.json',{ encoding: 'utf8', flag: 'r' }))
        const chatId = "chat-"+Math.random()
        chat[chatId] = {
            members: [
                {
                  id: currentUser.id
                },
                {
                  id: otherUser.id
                }
              ],
            messages : []
        }
        currentUser.friends.push({
            friendId : otherUser.id,
            chatId
        })
        otherUser.friends.push({
            friendId : currentUser.id,
            chatId
        })
        otherUser.friendRequests.meToOther = otherUser.friendRequests.meToOther.filter(req=>req.id !== currentUser.id)
        currentUser.friendRequests.otherToMe = currentUser.friendRequests.otherToMe.filter(req=>req.id !== otherUser.id)
        otherUser.notifications.push({
            id: Math.random(),
            autherId: currentUser.id,
            date: currentDate,
            type: "friend-requests-access"
        })
        fs.writeFileSync("./database/messages.json", JSON.stringify(chat,undefined,2));
    }else if(req.body.status === YOU_SEND){
        currentUser.friendRequests.meToOther = currentUser.friendRequests.meToOther.filter(req=>req.id !== otherUser.id)
        otherUser.friendRequests.otherToMe = currentUser.friendRequests.otherToMe.filter(req=>req.id !== currentUser.id)
        otherUser.notifications = otherUser.notifications.filter(notification=>{
            if(notification.type !== "friend-requests" && notification.autherId !== currentUser.id){
                return notification
            }
        })
    }

    fs.writeFileSync("./database/users.json", JSON.stringify(users,undefined,2));
    res.send({
        access : true,
        status : USER_STATUS_TRANSFORM[req.body.status],
        id : otherUser.id
    })
})


app.post(SETTINGS,passport.authenticate("jwt", {session : false}),upload.single("setting"),(req,res)=>{
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))

    const currentUser = users[req.user.id]
        
    if(req.body.title === "name"){
        currentUser.userName = req.body.setting
    }else if(req.body.title === "description"){
        currentUser.description = req.body.setting
    }else{
        currentUser.avatarImg = req.file.filename
    }



    fs.writeFileSync("./database/users.json", JSON.stringify(users,undefined,2));
    res.send({
        access : true,
        user : {
            isAuth : true,
            name : currentUser.userName,
            email : currentUser.email,
            id : currentUser.id,
            avatarImg : currentUser.avatarImg,
            description : currentUser.description
        }
    })
})


server.listen(process.env.PORT)