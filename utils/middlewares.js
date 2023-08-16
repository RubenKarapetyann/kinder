import jwt from "jsonwebtoken"

export const checkRefreshTokenMiddleware = (req,res,next) => {
    const refreshToken = req.cookies.refreshToken


    if (!refreshToken) {
      return res.sendStatus(401);
    }
  
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
      req.user = decoded;
    } catch (err) {
      console.log(err);
      return res.sendStatus(401);
    }
    return next();
}