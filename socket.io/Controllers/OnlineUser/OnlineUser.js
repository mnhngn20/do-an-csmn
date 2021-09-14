const OnlineUser = require('../../Models/OnlineUser/OnlineUser');

module.exports.addUser = async (userId, socketId) => {
    const user = await OnlineUser.findOne({
        userId: userId
    })
    if(user){
        console.log(socketId)
        await user.updateOne({
            socketId: socketId
        })
    } else {
        await OnlineUser.create({
            userId: userId,
            socketId: socketId
        })
    }
    return;
}

module.exports.getUsers = async () => {
    const users = await OnlineUser.find({});
    return users
}

module.exports.deleteUsers = async (socketId) => {
    await OnlineUser.deleteOne({
        socketId: socketId
    })
    return;
}