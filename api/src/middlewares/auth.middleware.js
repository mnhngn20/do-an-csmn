const jwtHelper = require('../helpers/jwtHelpers');
const Token = require('../models/Token');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

module.exports.isAuth = async (req, res, next) => {
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    if(tokenFromClient){
        const checkToken = await Token.exists({
            accessToken: tokenFromClient
        })
        if(checkToken){
            try {
                const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
                req.jwtDecoded = decoded;
                res.locals.userData = decoded.data
                next();
            }catch (err){
                return res.status(401).json({
                    message: err.message,
                });
            }
        } else {
            return res.status(403).send({
                message: "Token is too old."
            })
        }
    } else {
        return res.status(403).send({
            message: "No token provided.",
        })
    }
}