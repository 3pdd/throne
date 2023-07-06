const express = require('express');
const controller = require('./controllers');

const router = express.Router();

router.get('/NYrestrooms', controller.getRestrooms);
router.get('/coordinates/:address', controller.fetchCoordinatesForAddress);

module.exports = router;