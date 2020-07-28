const express = require('express');

const router = express.Router();
const controller = require('../controllers/comment.controller');
const validator = require('../middlewares/validators/comment.validator');

// ==================================================== Comment
/**
 * add a comment to the post
 */
router.post('/add-comment', validator.addComment, controller.addComment);

/**
 * like a comment
 */
router.post('/like-comment', validator.checkCommentId, controller.likeComment);

/**
 * get all comment by postId
 */
router.post('/get-comments', validator.getComments, controller.getComments);

/**
 * get all user already like the comment
 */
router.post(
    '/get-comment-likes',
    validator.checkCommentId,
    controller.getCommentLikes,
);

// ==================================================== Comment Reply
/**
 * add a reply comment
 */
router.post(
    '/add-reply',
    validator.addCommentReply,
    controller.addCommentReply,
);

/**
 * like a reply comment by commentReplyId
 */
router.post(
    '/like-reply',
    validator.checkCommentReplyId,
    controller.likeCommentReply,
);

/**
 * get all replies comment by commentId
 */
router.post(
    '/get-replies',
    validator.checkCommentId,
    controller.getCommentReplies,
);

/**
 * get all user already like the reply comment
 */
router.post(
    '/get-reply-likes',
    validator.checkCommentReplyId,
    controller.getCommentReplyLikes,
);
module.exports = router;
