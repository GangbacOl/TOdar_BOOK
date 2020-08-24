const express = require('express');
const router = express.Router();
const controller = require('./book.controller');

router.get('/read', controller.readBooks);
router.get('/loadBooksRead', controller.loadBooksRead);
router.post('/add', controller.addBook);
router.post('/update', controller.updateBooksTableContents);
router.post('/countNmbrBooksRead', controller.countNmbrBooksRead);
router.delete('/delete', controller.deleteBook);

module.exports = router;
