const status = require('http-status');
const mongoose = require('mongoose');

const Comment = require('../models/comment.model');
const CommentLike = require('../models/commentLike.model');
const CommentReply = require('../models/commentReply.model');
const CommentReplyLike = require('../models/commentReplyLike.mode');
const Post = require('../models/post.model');
const User = require('../models/user.model');

module.exports.addComment = async (req, res) => {
    const { postId, content } = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(status.NOT_FOUND).json({
                message: 'Post not found',
            });
        }
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(status.NOT_FOUND).json({
                message: 'User not found',
            });
        }
        const comment = await Comment.create({
            post: post.id,
            author: user.id,
            content,
        });
        await CommentLike.create({
            comment: comment.id,
        });
        return res.json({
            comment: {
                // eslint-disable-next-line no-underscore-dangle
                ...comment._doc,
                author: {
                    _id: user.id,
                    username: user.username,
                    fullname: user.fullname,
                    avatar: user.avatar,
                },
            },
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

module.exports.likeComment = async (req, res) => {
    const { commentId } = req.body;
    CommentLike.updateOne(
        { comment: commentId, user_likes: { $ne: req.userId } },
        {
            $addToSet: { user_likes: req.userId },
        },
    )
        .then(async (document) => {
            if (document.nModified !== 1) {
                await CommentLike.findOneAndUpdate(
                    { comment: commentId },
                    { $pull: { user_likes: req.userId } },
                );
                await User.findOneAndUpdate(
                    {
                        _id: req.userId,
                    },
                    {
                        $pull: { commentLikes: commentId },
                    },
                );
                return res.json({ commentId, action: 'disliked' });
            }

            await User.findOneAndUpdate(
                {
                    _id: req.userId,
                },
                {
                    $push: { commentLikes: commentId },
                },
            );
            return res.json({ commentId, action: 'liked' });
        })
        .catch((err) => {
            res.status(status.INTERNAL_SERVER_ERROR).json({
                message: err.message,
            });
        });
};

module.exports.getComments = async (req, res) => {
    const { postId } = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(status.NOT_FOUND).json({
                message: 'Post not found',
            });
        }
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(status.NOT_FOUND).json({
                message: 'User not found',
            });
        }

        const comments = await Comment.aggregate([
            {
                $match: {
                    post: mongoose.Types.ObjectId(postId),
                },
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
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
                    from: 'comment_likes',
                    localField: '_id',
                    foreignField: 'comment',
                    as: 'comment_likes',
                },
            },
            {
                $lookup: {
                    from: 'comment_replies',
                    localField: '_id',
                    foreignField: 'comment',
                    as: 'comment_replies',
                },
            },
            {
                $project: {
                    post: 1,
                    content: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    'author._id': 1,
                    'author.username': 1,
                    'author.fullname': 1,
                    'author.avatar': 1,
                    comment_likes: {
                        $size: {
                            $arrayElemAt: ['$comment_likes.user_likes', 0],
                        },
                    },
                    comment_replies: {
                        $size: '$comment_replies',
                    },
                },
            },
        ]);
        return res.json(comments);
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

module.exports.getCommentLikes = async (req, res) => {
    const { commentId } = req.body;

    try {
        const commentLike = await CommentLike.find({
            comment: commentId,
        }).populate('user_likes.author', 'avatar fullname username');
        if (commentLike.length < 1) {
            return res.status(status.NOT_FOUND).json({
                message: 'Comment not found',
            });
        }
        return res.json({ commentLike });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

// ===================================== Reply

module.exports.addCommentReply = async (req, res) => {
    const { commentId, content } = req.body;
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(status.NOT_FOUND).json({
                message: 'Comment not found',
            });
        }
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(status.NOT_FOUND).json({
                message: 'User not found',
            });
        }
        const commentReply = await CommentReply.create({
            comment: comment.id,
            author: user.id,
            content,
        });
        await CommentReplyLike.create({
            commentReply: commentReply.id,
        });
        return res.json({
            commentReply: {
                // eslint-disable-next-line no-underscore-dangle
                ...commentReply._doc,
                author: {
                    _id: user.id,
                    username: user.username,
                    fullname: user.fullname,
                    avatar: user.avatar,
                },
            },
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

module.exports.likeCommentReply = async (req, res) => {
    const { commentReplyId } = req.body;
    CommentReplyLike.updateOne(
        { commentReply: commentReplyId, user_likes: { $ne: req.userId } },
        {
            $addToSet: { user_likes: req.userId },
        },
    )
        .then(async (document) => {
            if (document.nModified !== 1) {
                await CommentReplyLike.findOneAndUpdate(
                    { commentReply: commentReplyId },
                    { $pull: { user_likes: req.userId } },
                );
                await User.findOneAndUpdate(
                    {
                        _id: req.userId,
                    },
                    {
                        $pull: { commentReplyLikes: commentReplyId },
                    },
                );
                return res.json({ commentReplyId, action: 'disliked' });
            }
            await User.findOneAndUpdate(
                {
                    _id: req.userId,
                },
                {
                    $push: { commentReplyLikes: commentReplyId },
                },
            );
            return res.json({ commentReplyId, action: 'liked' });
        })
        .catch((err) => {
            res.status(status.INTERNAL_SERVER_ERROR).json({
                message: err.message,
            });
        });
};

module.exports.getCommentReplies = async (req, res) => {
    const { commentId } = req.body;
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(status.NOT_FOUND).json({
                message: 'Comment not found',
            });
        }
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(status.NOT_FOUND).json({
                message: 'User not found',
            });
        }

        const commentReplies = await CommentReply.aggregate([
            {
                $match: {
                    comment: mongoose.Types.ObjectId(commentId),
                },
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
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
                    from: 'comment_reply_likes',
                    localField: '_id',
                    foreignField: 'commentReply',
                    as: 'comment_reply_likes',
                },
            },
            {
                $project: {
                    comment: 1,
                    content: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    'author._id': 1,
                    'author.username': 1,
                    'author.fullname': 1,
                    'author.avatar': 1,
                    comment_reply_likes: {
                        $size: {
                            $arrayElemAt: [
                                '$comment_reply_likes.user_likes',
                                0,
                            ],
                        },
                    },
                },
            },
        ]);
        return res.json(commentReplies);
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

module.exports.getCommentReplyLikes = async (req, res) => {
    const { commentReplyId } = req.body;

    try {
        const commentReplyLike = await CommentReplyLike.find({
            commentReply: commentReplyId,
        }).populate('user_likes.author', 'avatar fullname username');
        if (commentReplyLike.length < 1) {
            return res.status(status.NOT_FOUND).json({
                message: 'Reply comment not found',
            });
        }
        return res.json({ commentReplyLike });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};
