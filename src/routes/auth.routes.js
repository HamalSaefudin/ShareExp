const express = require('express');
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validate');
const { authValidation } = require('../validations');

const router = express.Router();

router.post('/login', validate(authValidation.login), authController.login);
router.post('/refreshAuth/:refreshToken', validate(authValidation.refreshAuth), authController.refreshAuth);

module.exports = router;
