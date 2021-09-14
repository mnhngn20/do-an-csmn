var mongoose = require('mongoose');

var onlineUserSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            
        },
        socketId: {
            type: String,
            
        },
    },
    { timestamps: false }
)

const OnlineUser = mongoose.model('OnlineUser', onlineUserSchema, 'onlineUsers');

module.exports = OnlineUser;