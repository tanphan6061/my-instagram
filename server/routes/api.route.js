const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');

const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const postRoutes = require('./post.route');

router.use('/auth', authRoutes);
router.use('/users', authMiddleware, userRoutes);
router.use('/posts', authMiddleware, postRoutes);

module.exports = router;
