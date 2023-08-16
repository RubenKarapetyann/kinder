import jwt from "jsonwebtoken"
import passportJWT from "passport-jwt"


const { ExtractJwt } = passportJWT


export const jwtConfig = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SESSION_SECRET
}

const generateToken = (user)=> {
    const accessPayload = {
        sub : user.id || user.sub,
        exp : Math.floor(new Date().getTime()/1000) + 10
    }

    const refreshPayload = {
        sub : user.id || user.sub,
        exp : Math.floor(new Date().getTime()/1000) + 60*60
    }

    const token = jwt.sign(accessPayload, jwtConfig.secretOrKey)
    const refresh = jwt.sign(refreshPayload, process.env.REFRESH_SECRET)
    return [token, refresh]
}

export default generateToken