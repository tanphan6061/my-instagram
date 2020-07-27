const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const status = require('http-status');

module.exports.createPost = (req, res, next) => {
    const schema = Joi.object({
        caption: Joi.string().insensitive().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(status.BAD_REQUEST).json({
            message: error.message,
        });
    }
    next();
};

module.exports.checkPostId = (req, res, next) => {
    const schema = Joi.object({
        postId: Joi.objectId().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(status.BAD_REQUEST).json({
            message: error.message,
        });
    }
    next();
};

module.exports.checkUserName = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(status.BAD_REQUEST).json({
            message: error.message,
        });
    }
    next();
};
