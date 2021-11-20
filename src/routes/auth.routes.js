const express = require('express');
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validate');
const authValidation = require('../validations/auth.validations');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
