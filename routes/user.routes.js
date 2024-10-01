const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/register', userController.UserRegister);
router.post('/login', userController.loginUser);



module.exports = router;
