const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        caption: {
            type: String,
            trim: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: 'You must supply an author',
        },
        media: {
            type: String,
            trim: true,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Post = mongoose.model('Post', postSchema, 'posts');
module.exports = Post;
