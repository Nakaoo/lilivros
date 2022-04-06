const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController')

router.get('/', HomeController.showHome);

module.exports = router;