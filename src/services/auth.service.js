const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { userService } = require('./user.service');

const loginUsernamePass = async (email, password) => {
    const user = userService.getUserByEmail(email);
    if (!user && !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;
};

module.exports = {
    loginUsernamePass,
};
