const status = require('http-status');
const mongoose = require('mongoose');

const Post = require('../models/post.model');
const PostLike = require('../models/postLike.model');
const Comment = require('../models/comment.model');

const lookup = [
    {
        $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            as: 'author',
        },
    },
    {
        $lookup: {
            from: 'post_likes',
            localField: '_id',
            foreignField: 'post',
            as: 'post_likes',
        },
    },
    {
        $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'post',
            as: 'comments',
        },
    },
];

const project = {
    caption: 1,
    media: 1,
    likes: {
        $size: { $arrayElemAt: ['$likes.user_likes', 0] },
    },
    comments: {
        $size: '$comments',
    },
    createdAt: 1,
    updatedAt: 1,
    'author._id': 1,
    'author.username': 1,
    'author.avatar': 1,
};

module.exports.createPost = async (req, res) => {
    const { caption } = req.body;
    try {
        const post = await Post.create({
            caption,
            author: req.userId,
            media: req.file.path,
        });
        await PostLike.create({
            post: post.id,
        });

        return res.json({
            post,
            likes: 0,
            comments: 0,
            replies: 0,
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

module.exports.likePost = async (req, res) => {
    const { postId } = req.body;
    PostLike.updateOne(
        { post: postId, user_likes: { $ne: req.userId } },
        {
            $addToSet: { user_likes: req.userId },
        },
    )
        .then(async (document) => {
            if (document.nModified !== 1) {
                await PostLike.findOneAndUpdate(
                    { post: postId },
                    { $pull: { user_likes: req.userId } },
                );
                return res.json({ postId, action: 'disliked' });
            }
            return res.json({ postId, action: 'liked' });
        })
        .catch((err) => {
            res.status(status.INTERNAL_SERVER_ERROR).json({
                message: err.message,
            });
        });
};

/**
 *
 * Get one post by id
 */
module.exports.getPost = async (req, res) => {
    const { postId } = req.body;
    try {
        const post = await Post.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(postId) },
            },
            ...lookup,
            {
                $project: project,
            },
        ]);
        if (!post.length) {
            return res
                .status(status.NOT_FOUND)
                .json({ message: 'Post not found' });
        }
        res.json(post[0]);
    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
};

module.exports.deletePost = async (req, res) => {
    const { postId } = req.body;
    try {
        const post = await Post.findOneAndDelete({
            _id: postId,
            author: req.userId,
        });
        if (!post) {
            return res.status(status.NOT_FOUND).json({
                message: 'Post not found',
            });
        }

        await Comment.deleteMany({
            post: post.id,
        });
        await PostLike.findOneAndDelete({
            post: post.id,
        });

        res.json({
            action: 'deleted',
            postId: post.id,
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: err.message,
        });
    }
};

module.exports.getPosts = async (req, res) => {
    const posts = await Post.aggregate([
        {
            $match: {
                author: {
                    $in: req.body.followings,
                },
            },
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
        ...lookup,
        {
            $project: {
                media: 1,
                created: 1,
                caption: 1,
                post_likes: {
                    $size: {
                        $arrayElemAt: ['$post_likes.user_likes', 0],
                    },
                },
                comments: {
                    $size: '$comments',
                },
                'author._id': 1,
                'author.username': 1,
                'author.fullname': 1,
                'author.avatar': 1,
            },
        },
    ]);
    res.json(posts);
};
