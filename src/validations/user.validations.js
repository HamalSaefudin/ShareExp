const Joi = require('joi');

const createUser = {
    body: Joi.object.keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        role: Joi.string().required().valid('user', 'admin'),
    }),
};

const getUser = {
    query: Joi.object.keys({
        name: Joi.string(),
        role: Joi.string().valid('user', 'admin'),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

module.exports = {
    createUser,
    getUser,
};
