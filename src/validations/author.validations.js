const Joi = require('joi');

const createAuthor = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        socialMedia: Joi.array(),
        description: Joi.string().required(),
    }),
};

module.exports = {
    createAuthor,
};
