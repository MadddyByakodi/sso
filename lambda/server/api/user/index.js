const express = require('express');
const controller = require('./user.controller');

const router = express.Router();

router.post('/magiclink', controller.magiclink);

module.exports = router;
