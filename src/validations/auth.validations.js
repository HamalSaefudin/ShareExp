const Joi = require('joi');

const login = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
};

const refreshAuth = {
    body: Joi.object().keys({
        token: Joi.string().required(),
    }),
    params: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

module.exports = {
    login,
    refreshAuth,
};
