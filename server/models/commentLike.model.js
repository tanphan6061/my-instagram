const mongoose = require('mongoose');

const commentLikeSchema = new mongoose.Schema({
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
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

const CommentLike = mongoose.model(
    'CommentLike',
    commentLikeSchema,
    'comment_likes',
);
module.exports = CommentLike;
