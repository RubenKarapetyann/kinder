import express from "express"
import { REGISTER, LOGIN, AUTH, LOG_OUT, HOME } from "./constants/routes-constants.js"
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
    const user = users.find(val=>val.id===payload.sub)

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
        const user = users.find(val=>val.email===email)
        if(!user){
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = {
                userName : name,
                email : email,
                password : hashedPassword,
                id : Math.random(),
                posts : [],
                frends : [],
                favorites : []
            }
            users.push(newUser)
            fs.writeFileSync("./database/users.json", JSON.stringify(users,undefined,2));
            res.send({access : true})
        }else{
            res.send({access : false,message : "email already used"})
        }
    }catch(err){
        res.status(401).send({access : false,message : "something went wrong"})
    }
})

app.post(LOGIN,async (req,res)=>{
    const { email, password } = req.body
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
    const user = users.find(val=>val.email===email)

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
    // const { id } = req.id
    const id = "sdfusdf7sd6f87s76dfs84df84sfd8se4f"
    const users = JSON.parse(fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' }))
    const user = users.find(val=>val.id===id)
    res.send({
        access : true,
        posts : []
    })
})

app.listen(process.env.PORT)