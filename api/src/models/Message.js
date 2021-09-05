var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema(
    {
        text: {
            type: String
        },
        senderId: {
            type: String
        },
        conversationId: {
            type: String
        }
    },
    { timestamps: true },
)

const Message = mongoose.model('Message', messageSchema, 'messages');

module.exports = Message;