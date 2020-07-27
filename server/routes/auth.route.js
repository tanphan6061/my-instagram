const express = require('express');

const router = express.Router();
const validator = require('../middlewares/validators/auth.validator');
const controller = require('../controllers/auth.controller');

router.post('/login', validator.login, controller.login);
router.post('/logout', validator.logout, controller.logout);
router.post('/register', validator.register, controller.register);
router.post('/verify', validator.verify, controller.verify);
router.post('/resend-code', validator.resendCode, controller.resendCode);
router.post('/refresh-token', validator.refreshToken, controller.refreshToken);

module.exports = router;
