const express = require('express');
const controller = require('./user.controller');

const router = express.Router();

router.post('/magiclink', controller.magiclink);
router.post('/loginPassword', controller.loginPassword);

module.exports = router;
