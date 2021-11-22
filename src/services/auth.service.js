const httpStatus = require('http-status');
const { userService } = require('.');
const ApiError = require('../utils/ApiError');

const loginUsernamePass = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    if (!user && !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;
};

module.exports = {
    loginUsernamePass,
};
