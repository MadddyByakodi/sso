const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const request = require('request');
const config = require('./config');

const app = express();
const auth = { user: config.ACCOUNTS_CLIENT, pass: config.ACCOUNTS_SECRET };

app.use(favicon(`${config.ASSET_DIR}/images/favicon.ico`));
app.use(express.static(config.ASSET_DIR));
app.use('/bower_components', express.static(__dirname + '/../bower_components'));

// parse application/json
app.use(bodyParser.json());
if (config.livereload) app.use(require('connect-livereload')());

app.post('/api/login', function login(req, res) {
  const options = {
    url: `${config.OAUTH_SERVER}${config.OAUTH_ENDPOINT}`, auth,
    form: {
      grant_type: 'password',
      username: req.body.username,
      password: req.body.password,
    },
  };

  request.post(options, config.handleResponse(res));
});

app.post('/api/refresh', function login(req, res) {
  const options = {
    url: `${config.OAUTH_SERVER}${config.OAUTH_ENDPOINT}`, auth,
    form: {
      grant_type: 'refresh_token',
      refresh_token: req.body.refresh_token,
    },
  };

  request.post(options, config.handleResponse(res));
});

app.post('/api/logout', function login(req, res) {
  const options = {
    url: `${config.OAUTH_SERVER}${config.OAUTH_ENDPOINT}/${req.body.access_token}`, auth,
  };

  request.del(options, config.handleResponse(res));
});

app.post('/api/forgotpass', function login(req, res) {
  const options = {
    url: `${config.OAUTH_SERVER}/users/forgotPassword`, json: true, auth,
    body: { grant_type: req.body.username },
  };

  request.post(options, config.handleResponse(res));
});

app.get('/*', (req, res) => res.sendFile('accounts.html', { root: `${config.ASSET_DIR}/html` }));

module.exports = app;
