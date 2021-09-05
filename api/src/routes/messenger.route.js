const express = require('express');
const router = express.Router();
const controller = require('../controllers/messenger.controller');

router.post('/newconversation', controller.newConversation)
router.get('/getconversations', controller.getConversations);
router.get('/conversation/:conversationId', controller.getConversation)
router.post('/message/sendmessage', controller.sendMessage);

module.exports = router;
