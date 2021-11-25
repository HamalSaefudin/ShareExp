const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const Token = require('../models/token.models');

const loginUsernamePass = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    if (!user && !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;
};

const refreshAuth = async (token, refreshToken) => {
    try {
        const _oldToken = await tokenService.getRefreshToken(refreshToken);
        const userId = await tokenService.getUserIdFromToken(token);
        const user = await userService.getUserById(userId);
        if (!user) {
            throw new Error('Token is invalid');
        }
        await _oldToken.remove();
        return tokenService.generateAuthToken(user);
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }
};

const logOut = async (token) => {
    const _token = await Token.findOne({ token });
    if (!_token) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
    }
    await _token.remove();
};

const changePassword = async (newpass, userid) => {
    const _user = await userService.getUserById(userid);
    if (!_user) {
        throw new Error('User doesnt find');
    }
    _user.password = newpass;
    await _user.save();
};

module.exports = {
    loginUsernamePass,
    refreshAuth,
    logOut,
    changePassword,
};
