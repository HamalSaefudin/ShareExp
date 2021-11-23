const httpStatus = require('http-status');
const { authService, tokenService } = require('../services');
const catchAsync = require('../utils/catchAsync');

exports.login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUsernamePass(email, password);
    const token = await tokenService.generateAuthToken(user);
    res.send(token);
});

exports.refreshAuth = catchAsync(async (req, res) => {
    const { token } = req.body;
    const { refreshToken } = req.params;
    const newToken = await authService.refreshAuth(token, refreshToken);
    res.send({ ...newToken });
});

exports.logout = catchAsync(async (req, res) => {
    await authService.logOut(req.body.token);
    res.status(httpStatus.NO_CONTENT).send();
});
