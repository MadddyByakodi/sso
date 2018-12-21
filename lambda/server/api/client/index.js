const express = require('express');

const router = express.Router();

const controller = require('./client.controller');

router.post('/payment', controller.payments);

module.exports = router;
