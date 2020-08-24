const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

router.post('/countNmbrJoinDays', controller.countNmbrJoinDays);

module.exports = router;
