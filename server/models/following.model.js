const mongoose = require('mongoose');

const followingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    followings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
});

const Following = mongoose.model('Following', followingSchema, 'followings');
module.exports = Following;
