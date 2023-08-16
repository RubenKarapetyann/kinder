import jwt from "jsonwebtoken"
import passportJWT from "passport-jwt"


const { ExtractJwt } = passportJWT


export const jwtConfig = {
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

export default generateToken