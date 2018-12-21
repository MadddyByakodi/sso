const express = require('express');
const controller = require('./user.controller');
const cronAuthenticate = require('./../../components/cronAuth');

const router = express.Router();

router.get('/', controller.index);
router.get('/authorise', controller.authorise);
router.post('/', cronAuthenticate(), controller.create);
router.get('/autoIncrementValue', cronAuthenticate(), controller.autoIncrementValue);
router.post('/magiclink', controller.magiclink);

module.exports = router;
