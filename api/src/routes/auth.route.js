const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/signup', controller.signUp);
router.post('/login', controller.login);
router.post('/gettoken', controller.refreshToken);
router.post('/changepassword', authMiddleware.isAuth ,controller.changePassword)
router.post('/resetpassword', controller.resetPassword)
router.get('/resetpassword/:userId/:token', controller.resetPasswordConfirm)

module.exports = router;