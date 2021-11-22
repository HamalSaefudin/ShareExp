const Joi = require('joi');

const createUser = {
    body: Joi.object.keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        role: Joi.string().required().valid('user', 'admin'),
    }),
};

const getUsers = {
    query: Joi.object.keys({
        name: Joi.string(),
        role: Joi.string().valid('user', 'admin'),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getUser = {
    params: Joi.object.keys({
        userId: Joi.string(),
    }),
};

const updateUser = {
    params: Joi.object.keys({
        userId: Joi.string(),
    }),
    body: Joi.object.keys({
        name: Joi.string().email(),
        password: Joi.string(),
        email: Joi.string(),
    }),
};

const deleteUser = {
    params: Joi.object.keys({
        userId: Joi.string(),
    }),
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};
