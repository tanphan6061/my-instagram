const express = require('express');
const cloudinary = require('../helper/cloudinary');

const router = express.Router();
const validator = require('../middlewares/validators/user.validator');
const controller = require('../controllers/user.controller');

const upload = cloudinary('avatars', 'avatar');

// router.get('/followers', controller.followers);
// router.get('/test', controller.getFollowings);
/**
 * Add avatar
 */
router.post('/add-avatar', upload.middleware, controller.addAvatar);

/**
 * Update profile
 */
router.post(
    '/update-profile',
    validator.updateProfile,
    controller.updateProfile,
);

/**
 * Change Password
 */
router.post(
    '/change-password',
    validator.changePassword,
    controller.changePassword,
);
/**
 * Follow another user by id
 */
router.post('/followers', validator.checkUserId, controller.followerUser);

/**
 * get data of use logged in
 */
router.get(
    '/get-user-data', 
    controller.getUserData, 
    controller.getUserPosts, 
    controller.sendUserData,
);

/**
 * get data of use by username
 */
router.post(
    '/get-by-username',
    validator.getDataByUserName,
    controller.getDataByUserName,
    controller.getUserPosts,
    controller.sendUserData,
);

/**
 * Search user by username (id username fullname avatar)
 */
router.post(
    '/search-by-username',
    validator.searchByUsername,
    controller.searchUserByUserName,
);

/**
 * list users follower (id username fullname avatar)
 */
router.post(
    '/get-users-follower',
    validator.checkUserId,
    controller.getUsersFollower,
);

/**
 * List users following
 */
router.post(
    '/get-users-following',
    validator.checkUserId,
    controller.getUsersFollowing,
);

module.exports = router;
