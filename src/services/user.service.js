const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create User
 * @param {Object} userPayload
 * @returns {Promise<User>}
 */
const createUser = async (userPayload) => {
    if (await User.isEmailTaken(userPayload.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return User.create(userPayload);
};

module.exports = {
    createUser,
};
