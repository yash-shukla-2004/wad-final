const express = require('express');
const router = express.Router();
const bookController = require('../controller/books.js');

router.post('/books', bookController.addBook);
router.get('/books', bookController.getBooks);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
