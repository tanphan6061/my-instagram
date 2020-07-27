const Joi = require('@hapi/joi');
const status = require('http-status');
Joi.objectId = require('joi-objectid')(Joi);
//

module.exports.checkUserId = (req, res, next) => {
    const schema = Joi.object({
        userId: Joi.objectId().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(status.BAD_REQUEST).json({
            message: error.message,
        });
    }
    next();
};

exports.searchByUsername = (req, res, next) => {
    const schema = Joi.object({
        q: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(status.BAD_REQUEST).json({
            message: error.message,
        });
    }
    next();
};
exports.getUserData = (req, res, next) => {
    const schema = Joi.object({
        profilePage: Joi.boolean().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(status.BAD_REQUEST).json({
            message: error.message,
        });
    }
    next();
};

exports.getDataByUserName = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        profilePage: Joi.boolean().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(status.BAD_REQUEST).json({
            message: error.message,
        });
    }
    next();
};

exports.changePassword = (req, res, next) => {
    const schema = Joi.object({
        password: Joi.string().insensitive().min(6).max(30).required(),
        newPassword: Joi.string().insensitive().min(6).max(30).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(status.BAD_REQUEST).json({
            message: error.message,
        });
    }
    next();
};

exports.updateProfile = (req, res, next) => {
    const minAgeYear = new Date().getFullYear() - 7 + 1;
    const schema = Joi.object({
        email: Joi.string()
            .max(40)
            .pattern(
                new RegExp(
                    /^[a-z][a-z0-9_\-\.]{2,32}@[a-z0-9_-]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
                ),
            )
            .insensitive()
            .messages({
                'string.pattern.base': 'Email invalid.',
            })
            .required(),
        username: Joi.string().insensitive().min(3).max(30).required(),
        fullname: Joi.string().insensitive().min(3).max(30).required(),
        date: Joi.date()
            .less(`'1-1-${minAgeYear}`)
            .message({
                'date.greater': 'You must be at least 7 years old',
            })
            .required(),
        gender: Joi.string().valid('male', 'female', '3rd').required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(status.BAD_REQUEST).json({
            message: error.message,
        });
    }
    next();
};
