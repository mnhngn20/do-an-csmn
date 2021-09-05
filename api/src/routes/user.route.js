const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.get('/user/:userId', controller.getUser);
router.post('/user/changeprofile', controller.changeProfile)
module.exports = router;