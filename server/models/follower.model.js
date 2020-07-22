const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
});

const Follower = mongoose.model('Follower', followerSchema, 'followers');
module.exports = Follower;
