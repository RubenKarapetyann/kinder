import express from "express"
import { REGISTER, LOGIN, AUTH, LOG_OUT, HOME, MESSAGES, COMMENTS, POST_COMMENTS, CHAT, NOTIFICATIONS, NEW_POST, PROFILE, FRIENDS, POST, ADD_FRIEND, SETTINGS, FAVORITES, REFRESH } from "./constants/routes-constants.js"
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
import { nanoid } from "nanoid"
import { getPost } from "./utils/getPost.js"
import { MongoClient } from "mongodb"
import getMessages from "./utils/getMessages.js"
import cookieParser from "cookie-parser"
import cookie from "cookie"
import generateToken, { jwtConfig } from "./utils/token-util.js"
import { checkRefreshTokenMiddleware } from "./utils/middlewares.js"


const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./database/images");
    },
    filename: (req, file, cb) =>{
        cb(null, `image_${nanoid(8)}.jpg`);
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

const client = new MongoClient(`mongodb+srv://ruben:${process.env.DB_PASSWORD}@kinder.0qql5fa.mongodb.net/`)
const cleanUp = ()=>{
    client.close()
    process.exit()
}
process.on("SIGINT",cleanUp)
process.on("SIGTERM",cleanUp)

await client.connect()
const db = client.db("kinder")

const { Strategy:JwtStrategy } = passportJWT

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(express.static("./database/images"))
app.use('/comments', express.static('./database/images'));
app.use('/profile', express.static('./database/images'));
app.use('/post', express.static('./database/images'));
app.use(SETTINGS, express.static('./database/images'));
app.use(MESSAGES, express.static('./database/images'));
app.use(LOGIN, express.static('./database/images'));
app.use(cookieParser())

passport.use(new JwtStrategy(jwtConfig,async (payload, done)=>{
    // const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
    // const user = users[payload.sub]

    // if(user){
    //     return done(null, user)
    // }else{
    //     return done(null,false)
    // }


    //db version
    try{
        const users = db.collection("users")
        const user = await users.findOne({ id : payload.sub })
        if(user){
            return done(null, user)
        }else{
            return done(null,false)
        }
    }catch(err){
        console.log(err);
    }
}));


app.post(REGISTER,async (req,res)=>{
    // try{
    //     const {email, name, password} = req.body
    //     const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
    //     const user = Object.values(users).find(val=>val.email===email)
    //     if(!user){
    //         const hashedPassword = await bcrypt.hash(password, 10)
    //         const id = `user_${nanoid(8)}`
    //         const newUser = {
    //             userName : name,
    //             email : email,
    //             avatarImg : "https://ionicframework.com/docs/img/demos/avatar.svg",
    //             password : hashedPassword,
    //             description : "no bio yet",
    //             id,
    //             posts : [],
    //             friends : [],
    //             favorites : [],
    //             notifications : [],
    //             friendRequests : {
    //                 meToOther : [],
    //                 otherToMe : []
    //             }
    //         }
    //         users[id] = newUser
    //         fs.writeFileSync("./database/users.json", JSON.stringify(users,undefined,2));
    //         res.send({access : true})
    //     }else{
    //         res.send({access : false,message : "email already used", type : "email"})
    //     }
    // }catch(err){
    //     res.status(400).send({access : false,message : "something went wrong", type : "repeatPassword"})
    // }



    //db version
    try{
        const {email, name, password} = req.body
        const users = db.collection("users")
        const user = await users.findOne({ email : email })
        if(!user){
            const hashedPassword = await bcrypt.hash(password, 10)
            const id = `user_${nanoid(8)}`
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
            await users.insertOne(newUser)
            res.send({access : true})
        }else{
            res.send({access : false,message : "email already used", type : "email"})
        }
    }catch(err){
        res.status(400).send({access : false,message : "something went wrong", type : "repeatPassword"})
        console.log(err);
    }
})

app.post(LOGIN,async (req,res)=>{
    // const { email, password } = req.body
    // const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
    // const user = Object.values(users).find(val=>val.email===email)


    // if(!user){
    //     return res.send({access : false, message : "incorrect email",type : "email"})
    // }

    // const validPassword = await bcrypt.compare(password,user.password)
    // if(!validPassword){
    //     return res.send({access : false, message : "incorrect password", type : "password"})
    // }

    // const token = generateToken(user)

    // res.send({access : true, token,
    //     user : {
    //         isAuth : true,
    //         user : {
    //             name : user.userName,
    //             email : user.email,
    //             id : user.id,
    //             avatarImg : user.avatarImg,
    //             description : user.description
    //         }
    // }})


    //db version
    try{
        const { email, password } = req.body
        const users = db.collection("users")
        const user = await users.findOne({ email : email })
    
        if(!user){
            return res.send({access : false, message : "incorrect email",type : "email"})
        }
    
        const validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword){
            return res.send({access : false, message : "incorrect password", type : "password"})
        }
    
        const [ token, refreshToken ] = generateToken(user)
        
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("refreshToken",refreshToken,{
                httpOnly : true,
                maxAge : 60*60*1000
            })
        )
        res.send({access : true, token,
            user : {
                isAuth : true,
                user : {
                    name : user.userName,
                    email : user.email,
                    id : user.id,
                    avatarImg : user.avatarImg,
                    description : user.description
                }
        }})
    }catch(err){
        res.status(400).send({ access : false })
    }
})


app.get(LOG_OUT,(req,res)=>{
    req.headers.authorization = null
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("refreshToken",refreshToken,{
            httpOnly : true,
            maxAge : 60*60*1000
        })
    )
    res.send({
        access : true
    })
})

app.get(REFRESH,checkRefreshTokenMiddleware,(req,res)=>{
    const [ token, refreshToken ] = generateToken(req.user)

    
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        })
    );
    res.send({ token });
})


app.get(HOME, passport.authenticate("jwt", {session : false}),async (req,res)=>{
    // const user = req.user
    // const { page } = req.query 
    // const posts = JSON.parse(fs.readFileSync('./database/posts.json',{ encoding: 'utf8', flag: 'r' }))
    // const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))

    // const allPosts = [...user.posts.map(post=>getPost(user,user,posts[post.postId])),...user.friends.reduce((state,friend)=>{
    //     return state.concat(...users[friend.friendId].posts.map(post=>getPost(user,users[friend.friendId],posts[post.postId])))
    // },[])].sort((p1,p2)=>p2.publicDate-p1.publicDate)

    // // const userPosts = user.posts.map(post=>{
    // //     const currentPost = posts[post.postId]
    // //     const currentUser = users[currentPost.auther.id]
    // //     return getPost(user,currentUser,currentPost) 
    // // })

    // // const friendsPost = user.friends.reduce((state,friend)=>{
    // //     return state.concat(...users[friend.friendId].posts.map(post=>{
    // //         const currentPost = posts[post.postId]
    // //         const currentUser = users[currentPost.auther.id]
    // //         return getPost(user,currentUser,currentPost)
    // //     }))
    // // },[])
    
    // res.send({
    //     access : true,
    //     posts : allPosts.slice(page*3,page*3+3)
    // })


    //db version
    try{const user = req.user
        const { page } = req.query 
    
        const users = db.collection("users")
        const posts = db.collection("posts")

        const userPosts = await Promise.all(user.posts.map(async post=>{
            const currentPost = await posts.findOne({ id :post.postId })
            return getPost(user,user,currentPost)
        }))

        const friendsPosts = (await Promise.all([user.friends.reduce(async (state,friend)=>{
            const currentFriend = await users.findOne({ id : friend.friendId })
            return state.concat(await Promise.all(currentFriend.posts.map(async post=>{
                const currentPost = await posts.findOne({ id :post.postId })
                return getPost(user,currentFriend,currentPost)
            })))
        },[])]))[0]

        const allPosts = [...userPosts,...friendsPosts].sort((p1,p2)=>p2.publicDate-p1.publicDate)
    
        res.send({
            access : true,
            posts : allPosts.slice(page*3,page*3+3)
        })
    }catch(err){
        res.status(400).send({ access : false })
        console.log(err);
    }
}) 



app.post(HOME, passport.authenticate("jwt", {session : false}),async (req,res)=>{
    // const user = req.user
    // const { postId, type } = req.body
    // const posts = JSON.parse(fs.readFileSync('./database/posts.json',{ encoding: 'utf8', flag: 'r' }))
    // const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))

    // const post = posts[postId]

    // if(type === "like"){
    //     if(post.likers[user.id]){
    //         post.likers[user.id] = false
    //         post.likes--
    //     }else{
    //         if(post.auther.id !== user.id && post.likers[user.id] === undefined){
    //             users[post.auther.id].notifications = [{
    //                 id : `notification_${nanoid(8)}`,
    //                 autherId : user.id,
    //                 date : new Date().getTime(),
    //                 type : "like",
    //                 watched : false
    //             },...users[post.auther.id].notifications]
    //         }
    //         post.likers[user.id] = true
    //         post.likes++
    //     }
    // }else{
    //     const currentUser = users[user.id]
    //     const post = currentUser.favorites.find(val=>val === postId)
    //     if(post){
    //         currentUser.favorites = currentUser.favorites.filter(val=>val!==postId)
    //     }else{
    //         currentUser.favorites.push(postId)
    //     }
    //     users[user.id] = currentUser
    // }

    // const currentUser = users[post.auther.id]
    // const backPost = getPost(users[user.id],currentUser,post)

    // fs.writeFileSync("./database/users.json", JSON.stringify(users,undefined,2));
    // fs.writeFileSync("./database/posts.json", JSON.stringify(posts,undefined,2));

    // res.send({
    //     access : true,
    //     post : backPost
    // })


    //db version
    try{
        const user = req.user
        const { postId, type } = req.body
        const users = db.collection("users")
        const posts = db.collection("posts")
    
        const post = await posts.findOne({ id : postId })
    
        if(type === "like"){
            if(post.likers[user.id]){
                post.likers[user.id] = false
                post.likes--
    
                await posts.updateOne({ id : postId },{
                    $inc : {
                        likes : -1
                    },
                    $set : {
                        likers : { [user.id] : false }
                    }
                })  
            }else{
                if(post.auther.id !== user.id && post.likers[user.id] === undefined){
                    await users.updateOne({ id : post.auther.id },{
                        $push : {
                            notifications : {
                                $each : [{
                                    id : `notification_${nanoid(8)}`,
                                    autherId : user.id,
                                    date : new Date().getTime(),
                                    type : "like",
                                    watched : false
                                }],
                                $position : 0
                            }
                        }
                    })
                }
                await posts.updateOne({ id : postId },{
                    $inc : {
                        likes : 1
                    },
                    $set : {
                        likers : { [user.id] : true }
                    }
                })  
            }
        }else{
            const currentUser = user
            const post = currentUser.favorites.find(val=>val === postId)
            if(post){
                await users.updateOne({ id : user.id },{
                    $pull : {
                        favorites : postId
                    }
                })
            }else{
                await users.updateOne({ id : user.id },{
                    $push : {
                        favorites : postId
                    }
                })
            }
        }
    
        const currentUser = await users.findOne({ id : post.auther.id })
        const updatedUser = await users.findOne({ id : user.id })
        const updatedPost = await posts.findOne({ id : postId })

        const backPost = getPost(updatedUser,currentUser,updatedPost)

        res.send({
            access : true,
            post : backPost
        })
    }catch(err){
        res.status(400).send({ access : false })
    }
})


app.get(MESSAGES,passport.authenticate("jwt", {session : false}),async (req,res)=>{
    // const { id, friends  } = req.user
    // const messages = JSON.parse(fs.readFileSync('./database/messages.json',{ encoding: 'utf8', flag: 'r' }))
    // const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))

    // if(req.query.search){
    //     const messagesList = friends.reduce((arr,friend)=>{
    //         if(new RegExp(req.query.search,"i").test(users[friend.friendId].userName)){
    //             const currentChat = messages[friend.chatId]
    //             const { id:currentUserId } = currentChat.members.find(val=>val.id===friend.friendId)
    //             const currentUser = users[currentUserId]
    //             const lastMessage = currentChat.messages[currentChat.messages.length-1] || {}
    //             let dontWathcedCount = 0
    //             for ( let i = currentChat.messages.length-1 ; i >= 0 ; i-- ){
    //                 if( currentChat.messages[i].watchers[id] ){
    //                     break
    //                 }
    //                 dontWathcedCount++
    //                 if( dontWathcedCount >= 99 ){
    //                     break
    //                 }
    //             } 
    //             return [...arr,{
    //                 sender : {
    //                     id: currentUserId,
    //                     userName: currentUser.userName,
    //                     avatarImg: currentUser.avatarImg
    //                 },
    //                 lastMessage : {
    //                     text : lastMessage.text,
    //                     autherId : lastMessage.autherId,
    //                     id : lastMessage.id,
    //                     sendDate : lastMessage.sendDate,
    //                     watched : !!lastMessage.watchers[id]
    //                 },
    //                 chatId : friend.chatId,
    //                 dontWathcedCount    
    //             }]
    //         }
    //         return arr
    //     },[])


    //     return res.send({
    //         access : true,
    //         list : messagesList
    //     })
    //}

    // const messagesList = friends.map(friend=>{
    //     const currentChat = messages[friend.chatId]
    //     const { id:currentUserId } = currentChat.members.find(val=>val.id===friend.friendId)
    //     const currentUser = users[currentUserId]
    //     const lastMessage = currentChat.messages[currentChat.messages.length-1] || {}
    //     let dontWathcedCount = 0
    //     for ( let i = currentChat.messages.length-1 ; i >= 0 ; i-- ){
    //         if( currentChat.messages[i].watchers[id] ){
    //             break
    //         }
    //         dontWathcedCount++
    //         if( dontWathcedCount >= 99 ){
    //             break
    //         }
    //     } 
    //     return {
    //         sender : {
    //             id: currentUserId,
    //             userName: currentUser.userName,
    //             avatarImg: currentUser.avatarImg
    //         },
    //         lastMessage : {
    //             text : lastMessage.text,
    //             autherId : lastMessage.autherId,
    //             id : lastMessage.id,
    //             sendDate : lastMessage.sendDate,
    //             watched : !!lastMessage.watchers[id]
    //         },
    //         chatId : friend.chatId,
    //         dontWathcedCount
    //     }
    // })

    // res.send({
    //     access : true,
    //     list : messagesList
    // })

    //db version
    try{
        const { id, friends  } = req.user
        const users = db.collection("users")
        const messages = db.collection("messages")

        if(req.query.search){
            const messagesList = await Promise.all([friends.reduce(async (arr,friend)=>{
                const currentUser = await users.findOne({ id : friend.friendId })
                if(new RegExp(req.query.search,"i").test(currentUser.userName)){
                    const currentChat = await messages.findOne({ id : friend.chatId })
                    return [...arr,getMessages(currentUser,currentChat,id,friend.chatId)]
                }
                return arr
            },[])])
    
            return res.send({
                access : true,
                list : messagesList[0]
            })
        }
    
        const messagesList = await Promise.all(friends.map(async friend=>{
            const currentChat = await messages.findOne({ id : friend.chatId })
            const currentUser = await users.findOne({ id : friend.friendId })

            return getMessages(currentUser,currentChat,id,friend.chatId)
        }))
    
        res.send({
            access : true,
            list : messagesList
        })
    }catch(err){
        res.status(400).send({ access : false })
        console.log(err);
    }
})


app.get(COMMENTS,passport.authenticate("jwt", {session : false}),async (req,res)=>{
    // const { id:postId } = req.params
    // // const { id, friends  } = req.user
    // const posts = JSON.parse(fs.readFileSync('./database/posts.json',{ encoding: 'utf8', flag: 'r' }))
    // const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))

    // const comments = posts[postId].comments.map(comment=>{
    //     const currentUser = users[comment.autherId]
    //     return {
    //         ...comment,
    //         avatarImg : currentUser.avatarImg,
    //         userName : currentUser.userName,
    //     }
    // })

    // res.send({
    //     access : true,
    //     list : comments
    // })


    //db version
    try{
        const { id:postId } = req.params
        const users = db.collection("users")
        const posts = db.collection("posts")
    
        const post = await posts.findOne({ id : postId })
        const comments = await Promise.all(post.comments.map(async comment=>{
            const currentUser = await users.findOne({ id : comment.autherId })
            return {
                ...comment,
                avatarImg : currentUser.avatarImg,
                userName : currentUser.userName,
            }
        }))
    
        res.send({
            access : true,
            list : comments
        })
    }catch(err){
        res.status(400).send({ access : false })
    }
})


app.post(POST_COMMENTS,passport.authenticate("jwt", {session : false}),async (req,res)=>{
    // const { id, avatarImg, userName } = req.user
    // const { comment,postId } = req.body
    // const posts = JSON.parse(fs.readFileSync('./database/posts.json',{ encoding: 'utf8', flag: 'r' }))
    // const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))

    // const newComment = {
    //     text: comment,
    //     autherId: id,
    //     likes: 0,
    //     id : `comment_${nanoid(8)}`
    // }

    // const post = posts[postId]
    // post.comments.push(newComment)
    // users[post.auther.id].notifications = [{
    //     id : `notification_${nanoid(8)}`,
    //     autherId : id,
    //     date : new Date().getTime(),
    //     type : "comment",
    //     watched : false
    // },...users[post.auther.id].notifications]
    // fs.writeFileSync("./database/posts.json", JSON.stringify(posts,undefined,2));
    // fs.writeFileSync("./database/users.json", JSON.stringify(users,undefined,2));

    // res.send({
    //     access : true,
    //     comment : {
    //         ...newComment,
    //         avatarImg,
    //         userName
    //     }
    // })


    //db version
    try{
        const { id, avatarImg, userName } = req.user
        const { comment,postId } = req.body
        const users = db.collection("users")
        const posts = db.collection("posts")
    
        const newComment = {
            text: comment,
            autherId: id,
            likes: 0,
            id : `comment_${nanoid(8)}`
        }
    

        const post = (await posts.findOneAndUpdate({ id : postId },{ $push : { comments : newComment } })).value

        if( id !== post.auther.id ){
            await users.updateOne({ id : post.auther.id },{
                $push : {
                    notifications : {
                        $each : [{
                            id : `notification_${nanoid(8)}`,
                            autherId : id,
                            date : new Date().getTime(),
                            type : "comment",
                            watched : false
                        }],
                        $position : 0
                    }
                }
            })
        }
    
    
        res.send({
            access : true,
            comment : {
                ...newComment,
                avatarImg,
                userName
            }
        })
    }catch(err){
        res.status(400).send({ access : false })
    }
})



app.get(CHAT,passport.authenticate("jwt", {session : false}),async (req,res)=>{
    // const { id:chatId } = req.params
    // const user = req.user
    // const chat = JSON.parse(fs.readFileSync('./database/messages.json',{ encoding: 'utf8', flag: 'r' }))
    // const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))

    // const messages = chat[chatId].messages.map(message=>{
    //     const currentUser = users[message.autherId]
    //     message.watchers[user.id] = true
    //     return {
    //         ...message,
    //         avatarImg : currentUser.avatarImg,
    //         userName : currentUser.userName,
    //     }
    // })

    // fs.writeFileSync("./database/messages.json", JSON.stringify(chat,undefined,2));
    // res.send({
    //     access : true,
    //     list : messages
    // })

    //db version
    try{
        const { id:chatId } = req.params
        const user = req.user
        const chat = db.collection("messages")
        const users = db.collection("users")

        const currentChat = await chat.findOne({ id : chatId })
        const messages = await Promise.all(currentChat.messages.map(async message=>{
            const currentUser = await users.findOne({ id : message.autherId })
            const userId = user.id
            await chat.updateOne({ id : chatId, "messages.id" : message.id },{
                $set : {
                    "messages.$.watchers" : { [userId] : true }
                }
            })
            return {
                ...message,
                avatarImg : currentUser.avatarImg,
                userName : currentUser.userName,
            }
        }))
        res.send({
            access : true,
            list : messages
        })
    }catch(err){
        res.status(400).send({ access : false })
    }
})

app.get(NOTIFICATIONS,passport.authenticate("jwt", {session : false}),async (req,res)=>{
    // const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
    // const user = users[req.user.id]

    // const notifications = user.notifications.map(notification=>{
    //     const currentUser = users[notification.autherId]
    //     notification.watched = true
    //     return {
    //         ...notification,
    //         avatarImg : currentUser.avatarImg,
    //         userName : currentUser.userName ,
    //         text : NOTIFICATIONS_TYPES[notification.type]
    //     }
    // })


    // fs.writeFileSync("./database/users.json", JSON.stringify(users,undefined,2));
    // res.send({
    //     access : true,
    //     list : notifications
    // })


    //db version
    try{
        const users = db.collection("users")
        const user = await users.findOne({ id : req.user.id })

        const notifications = await Promise.all(user.notifications.map(async notification=>{
            const currentUser = await users.findOne({ id : notification.autherId })
            await users.updateOne({ id : user.id, "notifications.id" : notification.id },{
                $set : {
                    "notifications.$.watched" : true
                }
            })
            return {
                ...notification,
                avatarImg : currentUser.avatarImg,
                userName : currentUser.userName ,
                text : NOTIFICATIONS_TYPES[notification.type]
            }
        }))


        res.send({
            access : true,
            list : notifications
        })
    }catch(err){
        res.status(400).send({ access : false })
    }
})


app.post(NEW_POST,passport.authenticate("jwt", {session : false}),upload.single("file"),async (req,res)=>{
    // const user = req.user

    // const posts = JSON.parse(fs.readFileSync('./database/posts.json',{ encoding: 'utf8', flag: 'r' }))
    // const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))


    // const postId = `post_${nanoid(8)}`
    // posts[postId] = {
    //     postDescription: req.body.description,
    //     id: postId,
    //     img: req.file.filename,
    //     likes: 0,
    //     likers: {},
    //     publicDate: new Date().getTime(),
    //     auther: {
    //         id: user.id
    //     },
    //     comments: []  
    // }
    // users[user.id].posts.push({postId})

    // fs.writeFileSync("./database/posts.json", JSON.stringify(posts,undefined,2));
    // fs.writeFileSync("./database/users.json", JSON.stringify(users,undefined,2));

    // res.send({
    //     access : true
    // })


    //db version
    try{
        const user = req.user

        const posts = db.collection("posts")
        const users = db.collection("users")
    
        const postId = `post_${nanoid(8)}`
        await posts.insertOne({
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
        })
        await users.updateOne({ id : user.id }, { $push : {
            posts : {postId}
        }})

        res.send({
            access : true
        })
    }catch(err){
        res.status(400).send({ access : false })
    }
})


app.get(PROFILE,passport.authenticate("jwt", {session : false}),async (req,res)=>{
    // const posts = JSON.parse(fs.readFileSync('./database/posts.json',{ encoding: 'utf8', flag: 'r' }))
    // const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
    // const { id } = req.params
    // const user = req.user


    // const isFriend = user.friends.find(friend=>friend.friendId === id) || id === user.id
    // const currentUser = users[id]
    // const profile = {
    //     auther : {
    //         id : currentUser.id,
    //         userName : currentUser.userName,
    //         avatarImg : currentUser.avatarImg,
    //         description : currentUser.description,
    //         friendsCount : currentUser.friends.length,
    //         postsCount : currentUser.posts.length
    //     },
    //     posts : isFriend ? currentUser.posts.map(post=>({
    //         postId : post.postId,
    //         img : posts[post.postId].img
    //     })) : []
    // }

    // res.send({
    //     access : true,
    //     profile
    // })


    //db version
    try{
        const { id } = req.params
        const user = req.user
        const users = db.collection("users")
        const posts = db.collection("posts")


        const isFriend = await users.findOne({ id : user.id, friends : { $elemMatch : { friendId : id } }}) || id === user.id
        const currentUser = await users.findOne({ id })
        const profile = {
            auther : {
                id : currentUser.id,
                userName : currentUser.userName,
                avatarImg : currentUser.avatarImg,
                description : currentUser.description,
                friendsCount : currentUser.friends.length,
                postsCount : currentUser.posts.length
            },
            posts : isFriend ? await Promise.all(currentUser.posts.map(async post=>({
                postId : post.postId,
                img : (await posts.findOne({ id : post.postId })).img //posts[post.postId].img
            }))) : []
        }

        res.send({
            access : true,
            profile
        })
    }catch(err){
        res.status(400).send({ access : false })
    }
})

app.get(FAVORITES,passport.authenticate("jwt", {session : false}),async (req,res)=>{
    // const { id } = req.params


    // if(id !== req.user.id){
    //     return res.send({
    //         access : false
    //     })
    // }
    // const posts = JSON.parse(fs.readFileSync('./database/posts.json',{ encoding: 'utf8', flag: 'r' }))
    // const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))

    // const favorites = users[id].favorites.map(postId=>({
    //     postId,
    //     img : posts[postId].img
    // }))

    // res.send({
    //     access : true,
    //     list : favorites
    // })
    

    //db version
    try{
        const { id } = req.params
        
        if(id !== req.user.id){
            return res.send({
                access : false
            })
        }
        const users = db.collection("users")
        const posts = db.collection("posts")
        const user = await users.findOne({ id })
    
        const favorites = await Promise.all(user.favorites.map(async postId=>{
            const image = (await posts.findOne({ id : postId })).img
            return {
                postId,
                img : image
            }
        }))
    
        res.send({
            access : true,
            list : favorites
        })
    }catch(err){
        res.status(400).send({ access : false })
    }
})

app.get(FRIENDS,passport.authenticate("jwt", {session : false}),async (req,res)=>{
    // const user = req.user
    // const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))

    // if(req.query.search){
    //     const friends = users[user.id].friends.reduce((arr,friend)=>{
    //         if(new RegExp(req.query.search,"i").test(users[friend.friendId].userName)){
    //             const currentFriend = users[friend.friendId]
    //             return [...arr,{
    //                 id : friend.friendId,
    //                 avatarImg : currentFriend.avatarImg,
    //                 userName : currentFriend.userName,
    //                 chatId : friend.chatId
    //             }]
    //         }
    //         return arr
    //     },[])
        
    //     return res.send({
    //         access : true,
    //         list : friends
    //     })
    // }


    // const friends = users[user.id].friends.map(friend=>{
    //     const currentFriend = users[friend.friendId]
    //     return ({
    //         id : friend.friendId,
    //         avatarImg : currentFriend.avatarImg,
    //         userName : currentFriend.userName,
    //         chatId : friend.chatId
    //     })
    // })

    // res.send({
    //     access : true,
    //     list : friends
    // })

    //db version
    try{
        const user = req.user
        const users = db.collection("users")
    
        if(req.query.search){
            const friends = await Promise.all([user.friends.reduce(async (arr,friend)=>{
                const currentFriend = await users.findOne({ id : friend.friendId })
                if(new RegExp(req.query.search,"i").test(currentFriend.userName)){
                    return [...arr,{
                        id : friend.friendId,
                        avatarImg : currentFriend.avatarImg,
                        userName : currentFriend.userName,
                        chatId : friend.chatId
                    }]
                }
                return arr
            },[])])
            
            return res.send({
                access : true,
                list : friends[0]
            })
        }
    
    
        const friends = await Promise.all(user.friends.map(async friend=>{
            const currentFriend = await users.findOne({ id : friend.friendId })
            return ({
                id : friend.friendId,
                avatarImg : currentFriend.avatarImg,
                userName : currentFriend.userName,
                chatId : friend.chatId
            })
        }))
    
        res.send({
            access : true,
            list : friends
        })
    }catch(err){
        res.status(400).send({ access : false })
    }
})

app.delete(FRIENDS+"/:id",passport.authenticate("jwt", {session : false}),async (req,res)=>{
    // const { id } = req.params
    // const { id:userId } = req.user
    // const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
    // const chat = JSON.parse(fs.readFileSync('./database/messages.json',{ encoding: 'utf8', flag: 'r' }))
    
    // let chatId 
    // users[userId].friends = users[userId].friends.filter(friend=>friend.friendId===id ? (chatId=friend.chatId) && false : true)
    // users[id].friends = users[id].friends.filter(friend=>friend.friendId!==userId)
    // delete chat[chatId]



    // fs.writeFileSync("./database/users.json", JSON.stringify(users,undefined,2));
    // fs.writeFileSync("./database/messages.json", JSON.stringify(chat,undefined,2));

    // res.send({
    //     access : true
    // })

    //db version
    try{
        const { id } = req.params
        const { id:userId } = req.user        
    
        const chat = db.collection("messages")
        const users = db.collection("users")
            
        const doc = await users.findOneAndUpdate({ id : userId },{ $pull : {
            friends : { friendId : id }
        }})
        const friend = doc.value.friends.find(friend=>friend.friendId===id)
        const chatId = friend.chatId

        await chat.deleteOne({ id : chatId })
        await users.updateOne({ id : id },{
            $pull : {
                friends : { friendId : userId }
            }
        })
    
        res.send({
            access : true
        })
    }catch(err){
        res.status(400).send({ access : false })
    }
})

app.get(POST,passport.authenticate("jwt", {session : false}),async (req,res)=>{
    // const { id } = req.params
    // const user = req.user
    // const posts = JSON.parse(fs.readFileSync('./database/posts.json',{ encoding: 'utf8', flag: 'r' }))
    // const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
    // const currentPost = posts[id]
    // const currentUser = users[currentPost.auther.id]

    // const post = getPost(user,currentUser,currentPost)

    // res.send({
    //     access : true,
    //     post
    // })


    //db version
    try{
        const { id } = req.params
        const user = req.user
        const posts = db.collection("posts")
        const users = db.collection("users")
    
        const currentPost = await posts.findOne({ id : id })
        const currentUser = await users.findOne({ id : currentPost.auther.id })
    
        const post = getPost(user,currentUser,currentPost)
    
        res.send({
            access : true,
            post
        })
    }catch(err){
        res.status(400).send({ access : false })
    }
})

app.get(AUTH,passport.authenticate("jwt", {session : false}),async (req,res)=>{
    // const user = req.user
    // const messages = JSON.parse(fs.readFileSync('./database/messages.json',{ encoding: 'utf8', flag: 'r' }))
    
    // let countNotifications = 0
    // for( let i in user.notifications ){
    //     if(user.notifications[i].watched){
    //         break
    //     }
    //     countNotifications++
    // }

    // let countMessages = 0
    // user.friends.forEach(friend => {
    //     const chat = messages[friend.chatId]
    //     countMessages = chat.messages[chat.messages.length-1].watchers[user.id] ? countMessages : ++countMessages
    // })

    // res.send({
    //     isAuth : true,
    //     user : {
    //         name : req.user.userName,
    //         email : req.user.email,
    //         id : req.user.id,
    //         avatarImg : req.user.avatarImg,
    //         description : req.user.description
    //     },
    //     notViewed : {
    //         notifications : countNotifications,
    //         messages : countMessages
    //     }
    // })

    //db version
    try{
        const user = req.user
        const messages = db.collection("messages")

        let countNotifications = 0
        for( let i in user.notifications ){
            if(user.notifications[i].watched){
                break
            }
            countNotifications++
        }
    
        let countMessages = 0
        await Promise.all(user.friends.map(async friend => {
            const chat = await messages.findOne({ id : friend.chatId })
            countMessages = chat.messages.length >= 1 ? (chat.messages[chat.messages.length-1].watchers[user.id] ? countMessages : ++countMessages) : 0
        }))
    
        res.send({
            isAuth : true,
            user : {
                name : req.user.userName,
                email : req.user.email,
                id : req.user.id,
                avatarImg : req.user.avatarImg,
                description : req.user.description
            },
            notViewed : {
                notifications : countNotifications,
                messages : countMessages
            }
        })
    }catch(err){
        res.status(400).send({ access : false })
        console.log(err);
    }
})


io.on("connection",(socket)=>{
    console.log("user connected")
    const { roomId } = socket.handshake.query
    socket.roomId = roomId
    socket.join(roomId)

    const sendMessage = (message)=>{
        io.in(socket.roomId).emit('message:add', message)
    }

    // const addMessage = (message)=>{
    //     const chat = JSON.parse(fs.readFileSync('./database/messages.json',{ encoding: 'utf8', flag: 'r' }))
    //     const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
    //     const newMessage = {
    //         text : message.text,
    //         autherId : message.autherId,
    //         id : `message_${nanoid(8)}`,
    //         sendDate : new Date().getTime(),
    //         watchers : {
    //             [message.autherId] : true
    //         }
    //     }
    //     chat[roomId].messages.push(newMessage)
    //     const user = users[message.autherId]
    //     sendMessage({
    //         ...newMessage,
    //         avatarImg : user.avatarImg,
    //         userName : user.userName,
    //     })
    //     fs.writeFileSync("./database/messages.json", JSON.stringify(chat,undefined,2));
    // }



    //db version
    const addMessage = async (message)=>{
        const chat = db.collection("messages")
        const users = db.collection("users")
        const newMessage = {
            text : message.text,
            autherId : message.autherId,
            id : `message_${nanoid(8)}`,
            sendDate : new Date().getTime(),
            watchers : {
                [message.autherId] : true
            }
        }
        await chat.updateOne({ id : roomId },{
            $push : { 
                messages : newMessage
            }
        })
        const user = await users.findOne({ id : message.autherId })
        sendMessage({
            ...newMessage,
            avatarImg : user.avatarImg,
            userName : user.userName,
        })
    }

    // socket.on('message:get', getMessages)
    socket.on('message:add', addMessage)
    // socket.on('message:remove', removeMessage)

    socket.on('disconnect', () => {
        console.log('User disconnected')
        socket.leave(roomId)
    })
})

app.get(ADD_FRIEND,passport.authenticate("jwt", {session : false}),async (req,res)=>{
    // const user = req.user
    // const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
    // let filteredList  = []
    // const search = req.query.search

    // if(search === ""){
    //     filteredList = user.friendRequests.otherToMe.map(user=>{
    //         const currentUser = users[user.id]
    //         return { 
    //             id : currentUser.id,
    //             avatarImg : currentUser.avatarImg,
    //             userName : currentUser.userName,
    //             status : OTHER_SEND
    //         }
    //     })
    //     return res.send({
    //         access : true,
    //         list : filteredList
    //     })
    // }

    // for (let i in users){
    //     if(new RegExp(search,"i").test(users[i].userName) && user.id !== users[i].id){
    //         const currentUser = users[i]
    //         const status = getUserStatus(user.friendRequests.otherToMe,user.friendRequests.meToOther,user.friends,currentUser.id)
    //         filteredList.push({
    //             id : currentUser.id,
    //             avatarImg : currentUser.avatarImg,
    //             userName : currentUser.userName,
    //             status
    //         })
    //     }
    // }
    // res.send({
    //     access : true,
    //     list : filteredList
    // })


    //db version
    try{
        const user = req.user
        const users = db.collection("users")
        let filteredList  = []
        const search = req.query.search
    
        if(search === ""){
            filteredList = await Promise.all(user.friendRequests.otherToMe.map(async user=>{
                const currentUser = await users.findOne({ id : user.id })
                return { 
                    id : currentUser.id,
                    avatarImg : currentUser.avatarImg,
                    userName : currentUser.userName,
                    status : OTHER_SEND
                }
            }))
            return res.send({
                access : true,
                list : filteredList
            })
        }
    
    
        const allUsers = await users.find({}).toArray()
    
        for (let i in allUsers){
            if(new RegExp(search,"i").test(allUsers[i].userName) && user.id !== allUsers[i].id){
                const currentUser = allUsers[i]
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
    }catch(err){
        res.status(400).send({ access : false })
    }

})



app.post(ADD_FRIEND,passport.authenticate("jwt", {session : false}),async (req,res)=>{
    // const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
    // const currentUser = users[req.user.id]
    // const otherUser = users[req.body.id]
    // const currentDate = new Date().getTime()


    // if(req.body.status === NOT_FRIENDS){
    //     otherUser.notifications = [{
    //         id: `notification_${nanoid(8)}`,
    //         autherId: currentUser.id,
    //         date: currentDate,
    //         type: "friend-requests",
    //         watched : false
    //     },...otherUser.notifications]
    //     otherUser.friendRequests.otherToMe.push({
    //         id : currentUser.id,
    //         date : currentDate
    //     })
    //     currentUser.friendRequests.meToOther.push({
    //         id : otherUser.id,
    //         date : currentDate
    //     })
    // }else if(req.body.status === OTHER_SEND){
    //     const chat = JSON.parse(fs.readFileSync('./database/messages.json',{ encoding: 'utf8', flag: 'r' }))
    //     const chatId = `chat_${nanoid(8)}`
    //     chat[chatId] = {
    //         members: [
    //             {
    //               id: currentUser.id
    //             },
    //             {
    //               id: otherUser.id
    //             }
    //           ],
    //         messages : []
    //     }
    //     currentUser.friends.push({
    //         friendId : otherUser.id,
    //         chatId
    //     })
    //     otherUser.friends.push({
    //         friendId : currentUser.id,
    //         chatId
    //     })
    //     otherUser.friendRequests.meToOther = otherUser.friendRequests.meToOther.filter(req=>req.id !== currentUser.id)
    //     currentUser.friendRequests.otherToMe = currentUser.friendRequests.otherToMe.filter(req=>req.id !== otherUser.id)
    //     otherUser.notifications = [{
    //         id: `notification_${nanoid(8)}`,
    //         autherId: currentUser.id,
    //         date: currentDate,
    //         type: "friend-requests-access",
    //         watched : false
    //     },...otherUser.notifications]
    //     fs.writeFileSync("./database/messages.json", JSON.stringify(chat,undefined,2));
    // }else if(req.body.status === YOU_SEND){
    //     currentUser.friendRequests.meToOther = currentUser.friendRequests.meToOther.filter(req=>req.id !== otherUser.id)
    //     otherUser.friendRequests.otherToMe = currentUser.friendRequests.otherToMe.filter(req=>req.id !== currentUser.id)
    //     otherUser.notifications = otherUser.notifications.filter(notification=>{
    //         if(notification.type !== "friend-requests" && notification.autherId !== currentUser.id){
    //             return notification
    //         }
    //     })
    // }

    // fs.writeFileSync("./database/users.json", JSON.stringify(users,undefined,2));
    // res.send({
    //     access : true,
    //     status : USER_STATUS_TRANSFORM[req.body.status],
    //     id : otherUser.id
    // })



    //db version
    try{
        const users = db.collection("users")

        const currentUser = await users.findOne({ id : req.user.id })
        const otherUser =  await users.findOne({ id : req.body.id })


        const currentDate = new Date().getTime()


        if(req.body.status === NOT_FRIENDS){

            await users.updateOne({ id : req.body.id },{
                $push : {
                    notifications : {
                        $each : [{
                            id: `notification_${nanoid(8)}`,
                            autherId: req.user.id,
                            date: currentDate,
                            type: "friend-requests",
                            watched : false
                        }],
                        $position : 0
                    }
                }
            })

            await users.updateOne({ id : req.body.id },{
                $push : {
                    "friendRequests.otherToMe" : {
                        id : req.user.id,
                        date : currentDate
                    }
                }
            })

            await users.updateOne({ id : req.user.id },{
                $push : {
                    "friendRequests.meToOther" : {
                        id : req.body.id,
                        date : currentDate
                    }
                }
            })
        }else if(req.body.status === OTHER_SEND){
            const chat = db.collection("messages")
            const chatId = `chat_${nanoid(8)}`

            await chat.insertOne({
                members: [
                    {
                        id: currentUser.id
                    },
                    {
                        id: otherUser.id
                    }
                ],
                messages : [],
                id : chatId
            })

            await users.updateOne({ id : req.user.id },{
                $push : {
                    friends : {
                        friendId : req.body.id,
                        chatId
                    }
                }
            })

            await users.updateOne({ id : req.body.id },{
                $push : {
                    friends : {
                        friendId : req.user.id,
                        chatId
                    }
                }
            })
            await users.updateOne({ id : req.body.id },{
                $pull : {
                    "friendRequests.meToOther" : {
                        id : req.user.id
                    }
                }
            })
            await users.updateOne({ id : req.user.id },{
                $pull : {
                    "friendRequests.otherToMe" : {
                        id : req.body.id
                    }
                }
            })

            await users.updateOne({ id : req.body.id },{
                $push : {
                    notifications : {
                        $each : [{
                            id: `notification_${nanoid(8)}`,
                            autherId: req.user.id,
                            date: currentDate,
                            type: "friend-requests-access",
                            watched : false
                        }],
                        $position : 0
                    }
                }
            })
        }else if(req.body.status === YOU_SEND){
            await users.updateOne({ id : req.user.id },{
                $pull : {
                    "friendRequests.meToOther" : {
                        id : req.body.id
                    }
                }
            })
            await users.updateOne({ id : req.body.id },{
                $pull : {
                    "friendRequests.otherToMe" : {
                        id : req.user.id
                    }
                }
            })

            await users.updateOne({ id : req.body.id },{
                $pull : {
                    notifications : {
                        autherId : req.user.id,
                        type : "friend-requests"
                    }
                }
            })
        }

        res.send({
            access : true,
            status : USER_STATUS_TRANSFORM[req.body.status],
            id : req.body.id
        })
    }catch(err){
        res.status(400).send({ access : false })
        console.log(err);
    }
})


app.post(SETTINGS,passport.authenticate("jwt", {session : false}),upload.single("setting"),async (req,res)=>{
    // const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))

    // const currentUser = users[req.user.id]
        
    // if(req.body.title === "name"){
    //     if(new RegExp(" ").test(req.body.setting)){
    //         return res.send({
    //             access : false
    //         })
    //     }
    //     currentUser.userName = req.body.setting
    // }else if(req.body.title === "description"){
    //     currentUser.description = req.body.setting
    // }else{
    //     currentUser.avatarImg = req.file.filename
    // }



    // fs.writeFileSync("./database/users.json", JSON.stringify(users,undefined,2));
    // res.send({
    //     access : true,
    //     user : {
    //         isAuth : true,
    //         name : currentUser.userName,
    //         email : currentUser.email,
    //         id : currentUser.id,
    //         avatarImg : currentUser.avatarImg,
    //         description : currentUser.description
    //     }
    // })

    //db version
    try{
        const users = db.collection("users")

        if(req.body.title === "name"){
            if(new RegExp(" ").test(req.body.setting)){
                return res.send({
                    access : false
                })
            }
            await users.updateOne({ id : req.user.id },{
                $set : {
                    userName : req.body.setting
                }
            })
        }else if(req.body.title === "description"){
            await users.updateOne({ id : req.user.id },{
                $set : {
                    description : req.body.setting
                }
            })
        }else{
            await users.updateOne({ id : req.user.id },{
                $set : {
                    avatarImg : req.body.setting
                }
            })
        }

        const currentUser = await users.findOne({ id : req.user.id })
        res.send({
            access : true,
            user : {
                isAuth : true,
                user : {
                    name : currentUser.userName,
                    email : currentUser.email,
                    id : currentUser.id,
                    avatarImg : currentUser.avatarImg,
                    description : currentUser.description
                }
            }
        })
    }catch(err){
        res.status(400).send({ access : false })
    }
})


server.listen(process.env.PORT)