const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');

const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const postRoutes = require('./post.route');
const commentRoutes = require('./comment.route');

router.use('/auth', authRoutes);
router.use('/users', authMiddleware, userRoutes);
router.use('/posts', authMiddleware, postRoutes);
router.use('/comments', authMiddleware, commentRoutes);

module.exports = router;
