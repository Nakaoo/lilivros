const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

router.get('/', BookController.showAll);
router.get('/create', BookController.create);
router.get('/edit/:id', BookController.editBookById);
router.post('/add', BookController.createPost);
router.post('/delete', BookController.deleteBook);
router.post('/edit', BookController.editBookByIdPost);

module.exports = router;