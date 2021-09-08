const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

module.exports.newConversation = async (req, res, next) => {
    const checkConversation = await Conversation.findOne({
        members: [
            req.body.senderId,
            req.body.receiverId
        ]
    })
    if(checkConversation){
        res.status(200).json({
            message: "Conversation's already created.",
            conversationId: checkConversation._id
        })
    } else {
        try{
            await Conversation.create({
                members: [
                    req.body.senderId,
                    req.body.receiverId
                ]
            })
            res.status(200).json({
                message: "Conversation created successfully."
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }
    return;
}

module.exports.getConversations = async (req, res, next) => {
    try{
        const conversations = await Conversation.find({
            members: { $in: [res.locals.userData.userId] }
        })
        res.status(200).json(conversations)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
    return;    
}

module.exports.sendMessage = async (req, res, next) => {
    try{
        const newMessage = await Message.create({
            text: req.body.text,
            senderId: res.locals.userData.userId,
            conversationId: req.body.conversationId
        })
        res.status(200).json(newMessage)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.getConversation = async (req, res, next) => {
    try{
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(messages)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}