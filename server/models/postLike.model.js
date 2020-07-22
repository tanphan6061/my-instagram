const mongoose = require('mongoose');

const postLikeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
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

const PostLike = mongoose.model('PostLike', postLikeSchema, 'post_likes');
module.exports = PostLike;
