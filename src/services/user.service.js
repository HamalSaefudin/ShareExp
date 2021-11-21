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

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUser = async (filter, options) => {
    const users = await User.paginate(filter, options);
    return users;
};

/**
 * get user by id
 * @param {string} userId
 * @returns {Promise<User>}
 */
const getUserById = async (userId) => {
    const user = User.findById(userId);
    return user;
};

/**
 * get user by email
 * @param {string} email
 * @returns {Promise<user>}
 */
const getUserByEmail = async (email) => User.findOne({ email });

module.exports = {
    createUser,
    queryUser,
    getUserById,
    getUserByEmail,
};
