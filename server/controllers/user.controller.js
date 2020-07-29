/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const status = require('http-status');
const User = require('../models/user.model');
const Follower = require('../models/follower.model');
const Following = require('../models/following.model');
const Post = require('../models/post.model');

module.exports.addAvatar = async (req, res) => {
    User.updateOne(
        {
            _id: req.userId,
        },
        {
            avatar: req.file.path,
        },
    )
        .then((data) => {
            if (data.nModified !== 1) {
                return res.status(status.NOT_FOUND).json({
                    message: 'User not found',
                });
            }
            return res.json({
                message: 'Updated avatar',
            });
        })
        .catch((err) => {
            res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
        });
};

module.exports.updateProfile = async (req, res) => {
    const { username, fullname, email, date, gender } = req.body;
    try {
        const userCheck = await User.findOne({
            $and: [
                { $or: [{ email }, { username }] },
                { _id: { $ne: req.userId } },
            ],
        }).select('username email');
        if (userCheck) {
            let message = '';
            if (userCheck.username === username) {
                message = 'Username exists';
            } else if (userCheck.email === email) {
                message = 'Email exists';
            }
            return res.status(status.CONFLICT).json({
                message,
            });
        }
        const user = await User.updateOne(
            {
                _id: req.userId,
            },
            {
                username,
                fullname,
                email,
                gender,
                date,
            },
        );
        if (user.nModified === 1) {
            return res.json({
                message: 'Updated User',
            });
        }
        return res.status(status.BAD_REQUEST).json({
            message: 'User not found',
        });
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

module.exports.changePassword = async (req, res) => {
    const { password, newPassword } = req.body;
    const user = await User.findById(req.userId);
    if (!user || !user.isActive) {
        return res.status(status.NOT_FOUND).json({
            message: 'User not found',
        });
    }

    user.comparePassword(password, async (err, isMatch) => {
        if (!isMatch) {
            return res.status(status.BAD_REQUEST).json({
                message:
                    'Sorry, your password is incorrect. Please check your password.',
            });
        }
        user.password = newPassword;
        user.save();
        return res.json(user);
    });
};

// follower another user
module.exports.followerUser = async (req, res) => {
    const { userId } = req.body;
    try {
        const userFollow = await User.findById(userId);
        if (!userFollow || !userFollow.isActive) {
            return res.status(status.NOT_FOUND).json({
                message: 'user not found',
            });
        }

        // if follow it self
        if (userFollow.id === req.userId) {
            return res.status(status.FORBIDDEN).json({
                message: 'Failed to follow',
            });
        }

        const following = await Following.updateOne(
            {
                user: req.userId,
                followings: { $ne: userId },
            },
            {
                $addToSet: {
                    followings: userId,
                },
            },
        );

        if (following.nModified === 1) {
            // follow success
            await Follower.updateOne(
                {
                    user: userId,
                },
                {
                    $push: {
                        followers: req.userId,
                    },
                },
            );
            return res.json({
                userId: userFollow.id,
                action: 'followed',
            });
        }else{
            await Following.updateOne(
                { user: req.userId },
                { $pull: { followings: userId } },
            );
            await Follower.updateOne(
                {
                    user: userId,
                },
                {
                    $pull: { followers: req.userId },
                },
            );
        }

        return res.json({
            userId: userFollow.id,
            action: 'unfollowed',
        });
    } catch (err) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json({ message: err.message });
    }
};

module.exports.getFollowings = async (req, res, next) => {
    try {
        const followings = await User.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.userId),
                },
            },
            {
                $lookup: {
                    from: 'followings',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'followings',
                },
            },
            {
                $project: {
                    followings: {
                        $arrayElemAt: ['$followings.followings', 0],
                    },
                },
            },
        ]);
        req.body.followings = followings[0].followings;
        next();
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: err.message,
        });
    }
};

// Get List Users(id, username, avatar) Following
module.exports.getUsersFollowing = async (req, res) => {
    const { userId } = req.body;
    try {
        const usersFollowing = await Following.find({
            user: userId,
        })
            .populate('followings', 'username avatar fullname')
            .select('followings');
        res.json(usersFollowing);
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: err.message,
        });
    }
};

// Get List Users(id, username, avatar) Follower
module.exports.getUsersFollower = async (req, res) => {
    const { userId } = req.body;
    try {
        const usersFollower = await Follower.find({
            user: userId,
        })
            .populate('followers', 'username avatar fullname')
            .select('followers.user');
        res.json(usersFollower);
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: err.message,
        });
    }
};

// Search user by UserName
module.exports.searchUserByUserName = async (req, res) => {
    const { q } = req.body;
    try {
        if (q) {
            const users = await User.find({
                $or: [
                    { fullname: new RegExp(`.*${q}.*`) },
                    { username: new RegExp(`.*${q}.*`) },
                ],
            })
                .limit(10)
                .select('username fullname avatar');
            return res.json({ users });
        }
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: err.message,
        });
    }
};

module.exports.getUserData = async (req, res, next) => {
    const query = [
        {
            $match: { _id: mongoose.Types.ObjectId(req.userId) },
        },
        {
            $lookup: {
                from: 'followings',
                localField: '_id',
                foreignField: 'user',
                as: 'followings',
            },
        },
        {
            $lookup: {
                from: 'followers',
                localField: '_id',
                foreignField: 'user',
                as: 'followers',
            },
        },
        {
            $project: {
                fullname: 1,
                username: 1,
                email: 1,
                avatar: 1,
                followings: {
                    $size: {
                        $arrayElemAt: ['$followings.followings', 0]
                    }
                },
                followers: {
                    $size: {
                        $arrayElemAt: ['$followers.followers', 0]
                    }
                },
                postLikes: 1,
                commentLikes: 1,
                commentReplyLikes: 1,
            },
        },
    ];
    try {
        const posts = await Post.find({
            author: req.userId,
        }).countDocuments();
        const user = await User.aggregate(query);
        const data = {
            ...user[0],
            postsCount: posts,
        };
        req.body.user = data;
        next()
    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: err.message,
        });
    }
};

module.exports.getUserPosts = async (req, res, next) => {
    const { user } = req.body;
    try {
        const posts = await Post.aggregate([
            {
                $match: {
                    author: mongoose.Types.ObjectId(user._id),
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
            {
                $project: {
                    media: 1,
                    createdAt: 1,
                    totalLikes: {
                        $size: { $arrayElemAt: ['$post_likes.user_likes', 0] },
                    },
                    limitLikes: {
                        $slice: ['$post_likes.user_likes', -1],
                    },
                    totalComments: {
                        $size: '$comments',
                    },
                    limitComments: {
                        $slice: ['$comments', -2],
                    },
                    caption: 1,
                    'author._id': 1,
                    'author.username': 1,
                },
            },
        ]);
        req.body.user.posts = posts;
    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: err.message,
        });
    }
    next();
};

module.exports.sendUserData = (req, res) => res.json({ user: req.body.user });

module.exports.getDataByUserName = async (req, res, next) => {
    const { username } = req.body;
    try {
        const user = await User.aggregate([
            {
                $match: {
                    username,
                },
            },
            {
                $lookup: {
                    from: 'followings',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'followings',
                },
            },
            {
                $lookup: {
                    from: 'followers',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'followers',
                },
            },
            {
                $project: {
                    username: 1,
                    fullname: 1,
                    email: 1,
                    avatar: 1,
                    followings: {
                        $size: {
                            $arrayElemAt: ['$followings.followings', 0],
                        },
                    },
                    followers: {
                        $size: {
                            $arrayElemAt: ['$followers.followers', 0],
                        },
                    },
                },
            },
        ]);
        if (user.length < 1) {
            return res.status(status.NOT_FOUND).json({
                message: 'User not found',
            });
        }
        // eslint-disable-next-line
        const posts = await Post.find({
            author: user[0]._id,
        }).countDocuments();
        const data = {
            ...user[0],
            postsCount: posts,
        };
        req.body.user = data;
        next();
    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: err.message,
        });
    }
};
