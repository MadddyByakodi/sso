const express = require('express');
const controller = require('./user.controller');
const authenticate = require('./../../components/oauth/authenticate');
const cronAuthenticate = require('./../../components/cronAuth');
const authenticate = require('./../../components/oauth/authenticate');

const router = express.Router();

router.get('/', controller.index);
router.get('/me', authenticate(), controller.me);
router.get('/authorise', controller.authorise);
router.post('/', cronAuthenticate(), controller.create);
router.post('/magiclink', controller.magiclink);
router.post('/invite', authenticate(), controller.invite);

module.exports = router;
