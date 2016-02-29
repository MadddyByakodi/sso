const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const request = require('request');
const config = require('./config');

const app = express();
const auth = { user: config.HIRE_CLIENT, pass: config.HIRE_SECRET };

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
      grant_type: 'authorization_code',
      redirect_uri: `${config.OAUTH_REDIRECT_URI}`,
      code: req.body.code,
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

app.get('/*', (req, res) => res.sendFile('hire.html', { root: `${config.ASSET_DIR}/html` }));

module.exports = app;
