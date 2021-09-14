const User = require('../models/User');
const UserData = require('../models/UserData');

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await UserData.find({});
        res.status(200).json(users)
    } catch (err){
        res.status(403).json({
            message: err.message
        })
    }
}

module.exports.getUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const userData = await UserData.findOne({_id: userId});
        res.status(200).json(userData)
    } catch (err){
        res.status(403).json({
            message: "Invalid User."
        })
    }
}

module.exports.changeProfile = async (req, res, next) => {
    try {
        const user = await UserData.findOneAndUpdate(res.locals.userData._id, {
            ...req.body
        });
        res.status(200).json({
            message: "Updated profile successfully."
        })
    } catch (err){
        res.status(500).json({
            message: err.message
        })
    }
    return;
}