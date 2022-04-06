const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController')

router.get('/signup', AuthController.registerUser);
router.post('/create', AuthController.registerUserPost);
router.get('/login', AuthController.loginUser);
router.post('/loginPost', AuthController.loginUserPost);
router.get('/logout', AuthController.logout);

module.exports = router;