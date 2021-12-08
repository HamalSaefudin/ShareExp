const express = require('express');
const validate = require('../middleware/validate');
const { authorValidation } = require('../validations');
const authorController = require('../controllers/author.controller');

const router = express.Router();

router.post('/createAuthor', validate(authorValidation.createAuthor), authorController.createAuthor);
router.get('/getAuthors', authorController.getAuthors);
router.get('/getAuthor/:authorId', authorController.getAuthor);
router.patch('/updateAuthor/:id', authorController.updateAuthor);
router.delete('/deleteUser/:id', authorController.deleteAuthor);

module.exports = router;
