const jwt = require('jsonwebtoken');
const status = require('http-status');
const shortid = require('shortid');
const mail = require('../helper/mail');

const User = require('../models/user.model');
const Follower = require('../models/follower.model');
const Following = require('../models/following.model');
const Verification = require('../models/verification.model');
const RefreshToken = require('../models/refreshToken.model');

shortid.characters(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@',
);

function generateAccessToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '5m',
    });
}

async function sendCode(user) {
    const code = shortid.generate();
    const veritification = await Verification.create({ user: user.id, code });

    mail.send(
        user.email,
        `${code} is your account authentication code`,
        `Hi ${user.fullname},<br/>
        Your account authentication code in My Instagram is: 
         <h1>${code}</h1><p style="color:red">* Note: Your verification code only exists for ${veritification.time} minutes </p>`,
    );
}

module.exports.login = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({
        $or: [{ username }, { email }],
    }).select('_id username email password isActive');

    if (!user) {
        return res.status(status.BAD_REQUEST).json({
            message:
                // eslint-disable-next-line quotes
                "The username you entered doesn't belong to an account. Please check your username and try again.",
        });
    }
    if (!user.isActive) {
        return res.status(status.UNAUTHORIZED).json({
            message: 'Your account has not been activated',
        });
    }
    user.comparePassword(password, async (err, isMatch) => {
        if (!isMatch) {
            return res.status(status.BAD_REQUEST).json({
                message:
                    'Sorry, your password is incorrect. Please check your password.',
            });
        }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = jwt.sign(
            { id: user.id },
            process.env.JWT_REFRESH_SECRET,
        );

        await RefreshToken.updateOne(
            {
                user: user.id,
                refreshTokens: { $ne: refreshToken },
            },
            {
                $addToSet: {
                    refreshTokens: refreshToken,
                },
            },
        );

        res.json({ accessToken, refreshToken });
    });
};

module.exports.register = async (req, res) => {
    // eslint-disable-next-line object-curly-newline
    const { username, email, password, fullname, date } = req.body;

    let user = await User.findOne({
        $or: [{ email }, { username }],
    });
    if (user) {
        let message = '';
        if (user.username === username) {
            message = 'Username exists';
        } else if (user.email === email) {
            message = 'Email exists';
        }
        return res.status(status.CONFLICT).json({
            message,
        });
    }
    try {
        user = await User.create({
            username,
            email,
            password,
            fullname,
            date,
        });

        await Follower.create({ user: user.id });
        await Following.create({ user: user.id });
        await RefreshToken.create({ user: user.id });

        sendCode(user);
        res.json({
            username,
            email,
            fullname,
            date,
            isActive: false,
        });
    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
};

module.exports.verify = async (req, res) => {
    const { email, username, code } = req.body;
    const user = await User.aggregate([
        {
            $match: {
                $or: [{ email }, { username }],
            },
        },
        {
            $lookup: {
                from: 'verifications',
                localField: '_id',
                foreignField: 'user',
                as: 'codes',
            },
        },
        {
            $project: {
                username: 1,
                email: 1,
                codes: 1,
            },
        },
        { $limit: 1 },
    ]);
    if (!user[0]) {
        return res.status(status.NOT_FOUND).json({
            message: 'User not exits',
        });
    }
    const { codes, _id } = user[0];
    const userCode = codes.find((i) => {
        // eslint-disable-next-line operator-linebreak
        const checkTime =
            (new Date() - new Date(i.createdAt)) / 60000 <= i.time;
        return i.code === code && checkTime;
    });
    if (!userCode) {
        return res.status(status.UNAUTHORIZED).json({
            message: 'Code incorrect',
        });
    }

    await Verification.deleteOne({
        code,
    });
    await User.findByIdAndUpdate({ _id }, { isActive: true });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
    );

    await RefreshToken.updateOne(
        {
            user: user.id,
            refreshTokens: { $ne: refreshToken },
        },
        {
            $addToSet: {
                refreshTokens: refreshToken,
            },
        },
    );
    res.json({ accessToken, refreshToken });
};

module.exports.refreshToken = async (req, res) => {
    const { token } = req.body; // refresh token
    if (!token) {
        return res.status(status.FORBIDDEN).json({
            message: 'No token provided',
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const idUser = decoded.id;

        const refreshTokens = await RefreshToken.findOne({
            user: idUser,
        }).select('refreshTokens');
        const checkToken = refreshTokens.refreshTokens.includes(token);

        if (checkToken) {
            const newAccessToken = generateAccessToken(idUser);
            return res.json({
                accessToken: newAccessToken,
            });
        }
        throw new Error(); // refresh Token not exists
    } catch (error) {
        return res.status(status.UNAUTHORIZED).json({
            message: 'Unauthorized: Invalid token',
        });
    }
};

module.exports.logout = async (req, res) => {
    const { token } = req.body; // refresh token
    if (!token) {
        return res.status(status.FORBIDDEN).json({
            message: 'No token provided',
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const idUser = decoded.id;
        const removeToken = await RefreshToken.updateOne(
            {
                user: idUser,
            },
            {
                $pull: { refreshTokens: token },
            },
        );
        if (removeToken.nModified === 1) {
            return res.json({
                message: 'Logout success',
            });
        }

        // refresh Token not exists
        throw new Error();
    } catch (error) {
        return res.status(status.UNAUTHORIZED).json({
            message: 'Unauthorized: Invalid token',
        });
    }
};

module.exports.resendCode = async (req, res) => {
    const { email, username } = req.body;
    const user = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (!user) {
        return res.status(status.NOT_FOUND).json({
            message: 'User not exits',
        });
    }
    sendCode(user);
    res.json({
        message:
            'The verification code has been sent to your email address. Please check and enter the code to activate your account.',
    });
};
