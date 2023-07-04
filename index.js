import express from "express"
import { REGISTER, LOGIN, AUTH, LOG_OUT, HOME, MESSAGES, COMMENTS } from "./constants/routes-constants.js"
import jwt from "jsonwebtoken"
import passport from "passport"
import passportJWT from "passport-jwt"
import bcrypt from "bcrypt"
import fs from "fs"

const app = express()
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
                id,
                posts : [],
                friends : [],
                favorites : []
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
        id : user.id
    }})
})


app.get(LOG_OUT,(req,res)=>{
    req.headers.authorization = null
    console.log("logout");
})


app.get(HOME, passport.authenticate("jwt", {session : false}), (req,res)=>{
    const user = req.user
    const posts = JSON.parse(fs.readFileSync('./database/posts.json',{ encoding: 'utf8', flag: 'r' }))
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))

    const userPosts = user.posts.map(post=>{
        return ({
            postDescription : posts[post.postId].postDescription, 
            id : posts[post.postId].id,
            img : posts[post.postId].img,
            likes : posts[post.postId].likes,
            liked : posts[post.postId].likers[user.id],
            publicDate : posts[post.postId].publicDate,
            auther : posts[post.postId].auther,
            favorite : !!user.favorites.find(val=>val.id===post.id)
    })})

    const friendsPost = user.friends.reduce((state,friend)=>{
        return state.concat(...users[friend.friendId].posts.map(post=>{
            return ({
                postDescription : posts[post.postId].postDescription, 
                id : posts[post.postId].id,
                img : posts[post.postId].img,
                likes : posts[post.postId].likes,
                liked : posts[post.postId].likers[user.id],
                publicDate : posts[post.postId].publicDate,
                auther : posts[post.postId].auther,
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


    const post = posts[postId]

    if(type === "like"){
        if(post.likers[user.id]){
            post.likers[user.id] = false
            post.likes--
        }else{
            post.likers[user.id] = true
            post.likes++
        }
    }else{
        const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
        const currentUser = users[user.id]
        const post = currentUser.favorites.find(val=>val === postId)
        if(post){
            currentUser.favorites = currentUser.favorites.filter(val=>val!==postId)
        }else{
            currentUser.favorites.push(postId)
        }
        users[user.id] = currentUser
        fs.writeFileSync("./database/users.json", JSON.stringify(users,undefined,2));
    }
    fs.writeFileSync("./database/posts.json", JSON.stringify(posts,undefined,2));
    res.send({
        access : true,
    })
})


app.get(MESSAGES,passport.authenticate("jwt", {session : false}),(req,res)=>{
    const { id, friends  } = req.user
    const messages = JSON.parse(fs.readFileSync('./database/messages.json',{ encoding: 'utf8', flag: 'r' }))


    const messagesList = friends.map(friend=>{
        const currentChat = messages[friend.chatId]
        return {
            sender : currentChat.members.find(val=>val.id===friend.friendId),
            lastMessage : currentChat.messages[currentChat.messages.length-1],
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
    const { id, friends  } = req.user
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
        commentsList : comments
    })
})


app.listen(process.env.PORT)