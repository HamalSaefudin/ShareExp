const httpStatus = require('http-status');
const { userService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');

exports.createUser = catchAsync(async (req, res) => {
    await userService.createUser(req.body);
    res.status(httpStatus.CREATED).json('User Created');
});

exports.getAllUser = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await userService.queryUser(filter, options);
    res.send(result);
});

exports.getUser = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
});
