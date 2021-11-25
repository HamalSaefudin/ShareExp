const moment = require('moment');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config/config');
const { Token } = require('../models');
const { tokenTypes } = require('../config/tokens');

/**
 * generate refresh token
 * @returns {String}
 */
const generateRandomToken = () => crypto.randomBytes(40).toString('hex');

/**
 * generate access token
 * @param {Object} user
 * @param {Date} expires
 * @param {String []} type
 * @param {String} secret
 * @returns {String}
 */
const generateToken = async (user, expires, type, secret = config.jwt.secret) => {
    const payload = {
        sub: user.id,
        iat: moment().unix(),
        expires: expires.unix(),
        type,
        roles: user.role,
    };
    return jwt.sign(payload, secret);
};

/**
 * save token to db
 * @param {String} token
 * @param {ObjectId} userId
 * @param {Date} expires
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires) => {
    const tokenDoc = await Token.create({
        token,
        user: userId,
        expires: expires.toDate(),
    });
    return tokenDoc;
};

/**
 * create access token and refresh token then save the token
 * @param {Object} user
 * @returns {Object []}
 */
const generateAuthToken = async (user) => {
    const accessTokenExp = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = await generateToken(user, accessTokenExp, tokenTypes.ACCESS);
    const refreshTokenExp = moment().add(config.jwt.refreshExpirationDays, 'hour');
    const refreshToken = generateRandomToken();
    await saveToken(refreshToken, user.id, refreshTokenExp);
    return {
        accessToken,
        refreshToken,
    };
};

/**
 * check && get token in db
 * @param {String} token
 * @returns {Promise<Token>}
 */
const verifyToken = async (token) => {
    const refToken = await Token.findOne({ token });
    if (!refToken) {
        throw new Error('Token is invalid');
    }
    return refToken;
};

/**
 * get ref token
 * @param {String} refToken
 * @returns {String}
 */
const getRefreshToken = async (refToken) => {
    const oldToken = await verifyToken(refToken);
    return oldToken;
};

/**
 *
 * @param {String} token
 * @returns {ObjectId}
 */
const getUserIdFromToken = (token) => {
    const { sub } = jwt.decode(token);
    return sub;
};

module.exports = {
    generateAuthToken,
    getRefreshToken,
    getUserIdFromToken,
};
