const Joi = require('@hapi/joi');
const status = require('http-status');
Joi.objectId = require('joi-objectid')(Joi);
//
module.exports.login = (req, res, next) => {
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
            }),
        username: Joi.string().max(40).insensitive(),
        password: Joi.string().required().insensitive(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(status.BAD_REQUEST).json({
            message: error.message,
        });
    }
    next();
};

module.exports.register = (req, res, next) => {
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
        password: Joi.string().insensitive().min(6).max(30).required(),
        fullname: Joi.string().insensitive().min(3).max(30).required(),
        // date: Joi.string().insensitive().min(3).max(30).required(),
        date: Joi.date()
            .less(`'1-1-${minAgeYear}`)
            .message({
                'date.greater': 'You must be at least 7 years old',
            })
            .required(),
    });
    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(status.BAD_REQUEST).json({
            message: error.message,
        });
    }
    next();
};

module.exports.verify = (req, res, next) => {
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
            }),
        code: Joi.string().insensitive().required(),
        username: Joi.string().insensitive().min(3).max(30),
    });
    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(status.BAD_REQUEST).json({
            message: error.message,
        });
    }
    next();
};

module.exports.resendCode = (req, res, next) => {
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
            }),
        username: Joi.string().insensitive().min(3).max(30),
    });
    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(status.BAD_REQUEST).json({
            message: error.message,
        });
    }
    next();
};

module.exports.refreshToken = (req, res, next) => {
    const schema = Joi.object({
        token: Joi.string().required(), // refresh token
    });
    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(status.BAD_REQUEST).json({
            message: error.message,
        });
    }
    next();
};

module.exports.logout = (req, res, next) => {
    const schema = Joi.object({
        token: Joi.string().required(), // refresh token
    });
    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(status.BAD_REQUEST).json({
            message: error.message,
        });
    }
    next();
};
