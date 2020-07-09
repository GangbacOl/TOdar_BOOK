const express = require('express');
const router = express.Router();
const controller = require('./book.controller');

router.post('/read', controller.readBooks);
router.post('/add', controller.addBook);
router.post('/update', controller.updateBooksTableContents);
router.delete('/delete', controller.deleteBook);
router.get('/loadBooksRead', controller.loadBooksRead);

module.exports = router;
