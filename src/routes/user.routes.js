const express = require('express');
const userController = require('../controllers/user.controller');
const validate = require('../middleware/validate');
const { userValidation } = require('../validations');

const router = express.Router();

router.post('/createUser', validate(userValidation.createUser), userController.createUser);
router.get('/getAllUser', validate(userValidation.getUsers), userController.getAllUser);
router.get('/getUser/:userId', validate(userValidation.getUser), userController.getUser);
router.patch('/updateUser/:userId', validate(userValidation.updateUser), userController.updateUserById);
router.delete('/deleteUser/:userId', validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
