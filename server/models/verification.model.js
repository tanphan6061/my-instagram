const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        code: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        time: {
            type: Number, // minute
            default: 5,
        },
    },
    {
        timestamps: true,
    },
);

const Verification = mongoose.model(
    'Verification',
    verificationSchema,
    'verifications',
);
module.exports = Verification;
