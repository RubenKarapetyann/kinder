import express from "express"
import { REGISTER, LOGIN, AUTH } from "./constants/routes-constants.js"
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
    const users = fs.readFileSync('./database/users.json',{ encoding: 'utf8', flag: 'r' });
    const user = users.find(val=>val.id===payload.sub)

    if(user){
        return done(null, user)
    }else{
        return done(null,false)
    }
}));


app.get(REGISTER,async (req,res)=>{
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
            fs.writeFileSync("./database/users.json", JSON.stringify(users));
        }else{
            console.log("dont created");
        }
    }catch(err){
        console.log(err)
    }
})

app.get(LOGIN,(req,res)=>{
    res.send({
        type : "log"
    })
})


app.get(AUTH,(req,res)=>{
    res.send({
        type : "auth"
    })
})

app.listen(process.env.PORT)