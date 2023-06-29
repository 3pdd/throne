const express = require('express');
const controller = require('./controllers');

const router = express.Router();

router.get('/NYrestrooms', controller.getRestrooms);

module.exports = router;