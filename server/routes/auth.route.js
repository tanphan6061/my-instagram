const express = require('express');

const router = express.Router();
const middleware = require('../middlewares/validators/user.middleware');
const controller = require('../controllers/auth.controller');

router.post('/login', middleware.login, controller.login);
router.post('/logout', middleware.logout, controller.logout);
router.post('/register', middleware.register, controller.register);
router.post('/verify', middleware.verify, controller.verify);
router.post('/resend-code', middleware.resendCode, controller.resendCode);
router.post('/refresh-token', middleware.refreshToken, controller.refreshToken);

module.exports = router;
