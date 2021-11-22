const moment = require('moment');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config/config');
const { Token } = require('../models');
const { tokenTypes } = require('../config/tokens');

const generateRandomToken = () => crypto.randomBytes(40).toString('hex');

const generateToken = async (user, expires, type, secret = config.jwt.secret) => {
    const payload = {
        sub: user.id,
        iat: moment().unix(),
        expires: expires.unix(),
        type,
        roles: user.roles,
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
    const accessToken = await generateToken(user, accessTokenExp, tokenTypes.ACCESS);
    const refreshTokenExp = moment().add(config.jwt.refreshExpirationDays, 'minutes');
    const refreshToken = generateRandomToken();
    await saveToken(refreshToken, user.id, refreshTokenExp);
    return {
        accessToken,
        refreshToken,
    };
};

module.exports = {
    generateAuthToken,
};
