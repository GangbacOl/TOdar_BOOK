const express = require('express');
const router = express.Router();
const controller = require('./book.controller');

router.post('/read', controller.readBooks);
router.post('/add', controller.addBook);

module.exports = router;
