const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    refreshTokens: [
        {
            type: String,
            required: true,
            trim: true,
        },
    ],
});

const RefreshToken = mongoose.model(
    'RefreshToken',
    refreshTokenSchema,
    'refresh_tokens',
);
module.exports = RefreshToken;
