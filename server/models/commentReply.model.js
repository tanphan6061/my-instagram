const mongoose = require('mongoose');

const commentReplySchema = new mongoose.Schema(
    {
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const CommentReply = mongoose.model(
    'CommentReply',
    commentReplySchema,
    'comment_replies',
);
module.exports = CommentReply;
