const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const User = require('../models/User');
const UserData = require('../models/UserData');

module.exports.newConversation = async (req, res, next) => {
    const checkConversation = await Conversation.findOne({
        members: {
            "$all": [
            req.body.senderId,
            req.body.receiverId
        ]}
    })
    console.log(checkConversation)
    if(checkConversation){
        res.status(200).json({
            message: "Conversation's already created.",
            conversationId: checkConversation._id
        })
    } else {
        try{
            const newConversation = await Conversation.create({
                members: [
                    req.body.senderId,
                    req.body.receiverId
                ]
            })
            res.status(200).json({
                message: "Conversation created successfully.",
                conversationId: newConversation._id
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
            senderId: req.body.senderId,
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
        const conversation = await Conversation.findOne({
            _id: req.params.conversationId
        })

        let members = [];
        for(let member of conversation.members){
            const userData = await UserData.findOne({
                _id: member
            })
            members.push(userData)
        }
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        const data = {
            messages: messages,
            members: members,
            conversationId: req.params.conversationId
        }
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.deleteConversation = async (req, res, next) => {
    try {
        await Conversation.findByIdAndDelete({
            _id: req.params.conversationId
        })
        await Message.deleteMany({conversationId: req.params.conversationId})
        res.status(200).json({
            message: "Deleted successfully."
        })
    } catch (err){
        res.status(500).json({
            message: err.message
        })
    }
}
