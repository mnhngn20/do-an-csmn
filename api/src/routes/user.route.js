const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.get('/get-all-users', controller.getAllUsers)
router.get('/user/:userId', controller.getUser);
router.post('/user/change-profile', controller.changeProfile)

module.exports = router;