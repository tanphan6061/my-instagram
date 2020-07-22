require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username: {
            required: true,
            trim: true,
            type: String,
            minlength: 3,
            maxlength: 30,
            unique: true,
        },
        email: {
            type: String,
            match: /^[a-z][a-z0-9_\-\.]{2,32}@[a-z0-9_-]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
            unique: true,
            trim: true,
            required: true,
        },
        password: {
            required: true,
            trim: true,
            type: String,
            minlength: 6,
            maxlength: 30,
        },
        fullname: {
            required: true,
            trim: true,
            type: String,
            minlength: 3,
            maxlength: 30,
        },
        avatar: {
            type: String,
            default:
                'https://res.cloudinary.com/binzlark/image/upload/v1595298130/my-instagram/avatar/person_paqs7g_j9pnws.png',
        },
        date: {
            type: Date,
            default: Date.now,
        },
        gender: {
            type: String,
            default: 'male',
            trim: true,
            enum: ['male', 'female', '3rd'],
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        activityStatus: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

// eslint-disable-next-line func-names
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next(); // if user not change password
    const salt = parseInt(process.env.BCRYPT_HASH, 10);
    bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        next();
    });

    // bcrypt.genSalt(process.env.BCRYPT_HASH, function (err, salt) {
    //     bcrypt.hash(user.password, salt, (err, hash) => {
    //         if (err) throw err;
    //         user.password = hash;
    //         next();
    //     });
    // });
});

// eslint-disable-next-line func-names
userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return cb(err);
        return cb(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;
