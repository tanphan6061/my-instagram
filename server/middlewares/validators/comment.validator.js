const status = require('http-status');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

// ========================== Comment
module.exports.addComment = (req, res, next) => {
    const schema = Joi.object({
        postId: Joi.objectId().required(),
        content: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(status.BAD_REQUEST).json({
            message: error.message,
        });
    }
    next();
};

module.exports.checkCommentId = (req, res, next) => {
    const schema = Joi.object({
        commentId: Joi.objectId().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(status.BAD_REQUEST).json({
            message: error.message,
        });
    }
    next();
};

module.exports.getComments = (req, res, next) => {
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

// ========================== Reply
/**
 * Add reply
 */
module.exports.addCommentReply = (req, res, next) => {
    const schema = Joi.object({
        commentId: Joi.objectId().required(),
        content: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(status.BAD_REQUEST).json({
            message: error.message,
        });
    }
    next();
};

module.exports.checkCommentReplyId = (req, res, next) => {
    const schema = Joi.object({
        commentReplyId: Joi.objectId().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(status.BAD_REQUEST).json({
            message: error.message,
        });
    }
    next();
};
