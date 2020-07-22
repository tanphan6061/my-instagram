const mongoose = require('mongoose');

const commentReplyLikeSchema = new mongoose.Schema({
    commentReply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommentReply',
        required: true,
    },
    user_likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    ],
});

const CommentReplyLike = mongoose.model(
    'CommentReplyLike',
    commentReplyLikeSchema,
    'comment_reply_likes',
);
module.exports = CommentReplyLike;
