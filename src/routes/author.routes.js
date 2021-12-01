const express = require('express');
const validate = require('../middleware/validate');
const { authorValidation } = require('../validations');
const authorController = require('../controllers/author.controller');

const router = express.Router();

router.post('/createAuthor', validate(authorValidation.createAuthor), authorController.createAuthor);

module.exports = router;
