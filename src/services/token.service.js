const moment = require('moment');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { Token } = require('../models');
const { tokenTypes } = require('../config/tokens');

const generateToken = async (userId, expires, type, secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        expires: expires.unix(),
        type,
    };
    return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expires) => {
    const tokenDoc = await Token.create({
        token,
        user: userId,
        expires: expires.toDate(),
    });
    return tokenDoc;
};

const generateAuthToken = async (user) => {
    const accessTokenExp = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user.id, accessTokenExp, tokenTypes.ACCESS);

    const refreshTokenExp = moment().add(config.jwt.refreshExpirationDays, 'minutes');
    const refreshToken = generateToken(user.id, refreshTokenExp, tokenTypes.REFRESH);
    await saveToken(refreshToken, user.id, refreshTokenExp);

    return {
        accessToken,
        refreshToken,
    };
};

module.exports = {
    generateAuthToken,
};
