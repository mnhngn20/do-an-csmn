const dotenv = require("dotenv");
dotenv.config();

const User = require('../models/User');
const UserData = require('../models/UserData');
const Token = require('../models/Token')
const md5 = require('md5');
const jwtHelper = require('../helpers/jwtHelpers');
const emailSender = require('../utils/emailSender');

module.exports.signUp = async (req, res) => {
    const users = await User.exists({email: req.body.email});
    if(users){
        res.status(409).json({
            message: "Email is already in used."
        })
        return;
    } else {
        try {
            const hashPassword = md5(req.body.password);
            const newUser = await User.create({
                email: req.body.email,
                password: hashPassword
            });
            const newUserData = {
                ...req.body,
                _id: newUser._id.toString()
            }
            delete newUserData.password;
            await UserData.create(newUserData);
            res.status(200).json({
                message: "Created Successful"
            });
        }catch(err){
            res.status(500).json(err)
        }
    }
}

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

module.exports.login = async (req, res) => {
    const checkEmail = await User.exists({email: req.body.email})
    if(checkEmail){
        const hashedPassword = md5(req.body.password);
        const checkPassword = await User.exists({email: req.body.email, password: hashedPassword})
        if(checkPassword){
            const getUser = await UserData.findOne({email: req.body.email});
            const userData = {
                userId: getUser._id,
                name: getUser.name,
                email: getUser.email
            }
            console.log(userData)
            const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife);
            const refreshToken = await jwtHelper.generateToken(userData, refreshTokenSecret, refreshTokenLife);
            await Token.deleteOne({_id: getUser._id});
            await Token.create({
                accessToken, 
                refreshToken,
                _id: getUser._id
            })
            res.status(200).json({
                accessToken,
                refreshToken,
                expiresIn: 3600
            })
        }else{
            res.status(401).json({
                message: "Password is wrong."
            })
        }    
    } else {
        res.status(401).json({
            message: "Email is invalid."
        })
    }
}

module.exports.refreshToken = async (req, res) => {
    const refreshTokenFromClient = req.body.refreshToken;
    if(refreshTokenFromClient){
        const checkRefreshToken = await Token.exists({refreshToken: refreshTokenFromClient});
        if(checkRefreshToken){
            try{
                const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret)
                const accessToken = await jwtHelper.generateToken(decoded.data, accessTokenSecret, accessTokenLife);
                const refreshToken = await jwtHelper.generateToken(decoded.data, refreshTokenSecret, refreshTokenLife);
                await Token.deleteOne({
                    _id: decoded.data.userId
                })
                await Token.create({
                    accessToken, 
                    refreshToken,
                    _id: decoded.data.userId
                })
                return res.status(200).json({accessToken, refreshToken, expiresIn: 3600});
            }catch (err){
                return res.status(402).json({
                    message: 'Invalid token.'
                })
            }
        } else {
            return res.status(402).json({
                message: 'Invalid token.'
            })
        }
    }else{
        return res.status(403).json({
            message: 'No token provided.'
        })
    }   
}

module.exports.changePassword = async (req, res, next) => {
    const newPassword = md5(req.body.password);
    try {
        await User.findOneAndUpdate(req.body.userId, {
            password: newPassword
        });
        const accessToken = await jwtHelper.generateToken(res.locals.userData, accessTokenSecret, accessTokenLife);
        const refreshToken = await jwtHelper.generateToken(res.locals.userData, refreshTokenSecret, refreshTokenLife);
        await Token.deleteOne({
            _id: req.body.userId
        })
        await Token.create({
            accessToken, 
            refreshToken,
            _id: req.body.userId
        })
        return res.status(200).json({accessToken, refreshToken, expiresIn: 3600});
    } catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const passwordResetTokenSecret = process.env.PASSWORD_RESET_TOKEN_SECRET;
const passwordResetTokenLife = process.env.PASSWORD_RESET_TOKEN_LIFE;

module.exports.resetPassword = async (req, res, next) => {
    const userEmail = req.body.email;
    const user = await User.findOne({ email: userEmail });
    if(user){
        const password = md5(req.body.password);
        let passwordResetToken = await Token.findOne({
            _id: user._id
        })
        if(!passwordResetToken){
            passwordResetToken = await jwtHelper.generateToken({
                email: userEmail,
                password
            }, passwordResetTokenSecret, passwordResetTokenLife);
            await Token.create({
                passwordResetToken,
                _id: user._id
            });
        } else {
            passwordResetToken = await jwtHelper.generateToken({
                email: userEmail,
                password
            }, passwordResetTokenSecret, passwordResetTokenLife);
            await Token.deleteOne({
                _id: user._id
            })
            await Token.create({
                passwordResetToken,
                _id: user._id
            })
        }
        const link = `http://localhost:3000/auth/resetpassword/${user._id}/${passwordResetToken}`
        await emailSender.sendEmail(userEmail, "Reset Password confirming", 
            `Hello ${userEmail}, here is the link to reset your password: ` + link);
        res.status(200).json({
            message: "An email is sent to confirm reseting password."
        })
        console.log(link)
    } else {
        res.status(403).json({
            message: "Invalid user or email"
        })
    }
}

module.exports.resetPasswordConfirm = async (req, res, next) => {
    const userId = req.params.userId;
    const userToken = req.params.token;
    const token = await Token.findOne({
        passwordResetToken: userToken
    })
    if(token){
        try{
            const decoded = await jwtHelper.verifyToken(token.passwordResetToken, passwordResetTokenSecret)
            await User.findOneAndUpdate(userId, {
                password: decoded.data.password
            })
            await Token.deleteOne({
                _id: userId
            })
            res.status(200).send("Password Reset successfully!")
        }catch(err){
            res.status(500).json({
                message: err.message
            })
        }
        return;
    } else {
        return res.status(403).json({
            message: "Token expired."
        })
    }
}