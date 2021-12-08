const Joi = require('joi');

const createAuthor = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        socialMedia: Joi.array(),
        description: Joi.string().required(),
    }),
};

const getAuthors = {
    query: Joi.object().keys({
        name: Joi.string(),
        role: Joi.string().valid('user', 'admin'),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

module.exports = {
    createAuthor,
    getAuthors,
};
