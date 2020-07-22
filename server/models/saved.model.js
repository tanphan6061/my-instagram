const mongoose = require('mongoose');

const savedPostSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Post',
            },
        ],
    },
    {
        timestamps: true,
    },
);

const SavedPost = mongoose.model('SavedPost', savedPostSchema, 'saved_posts');
module.exports = SavedPost;
