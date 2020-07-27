const express = require('express');
const cloudinary = require('../helper/cloudinary');

const router = express.Router();
const userController = require('../controllers/user.controller');
const controller = require('../controllers/post.controller');
const validator = require('../middlewares/validators/post.validator');

const upload = cloudinary('posts', 'media');
/**
 * create a post
 */
router.post(
    '/create',
    upload.middleware,
    validator.createPost,
    controller.createPost,
);

/**
 * like a post
 */
router.post('/like', validator.checkPostId, controller.likePost);

/**
 * get a post by id
 */
router.get('/get', validator.checkPostId, controller.getPost);

/**
 * delete a post by id
 */
router.post('/delete', validator.checkPostId, controller.deletePost);

/**
 * get list posts of users following
 */
router.get(
    '/get-posts-following',
    userController.getFollowings,
    controller.getPosts,
);

module.exports = router;
