const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const request = require('request');
const env = require('./config');

const app = express();
const auth = { user: env.hire.client, pass: env.hire.secret };

app.use(favicon(`${env.asset_dir}/images/favicon.ico`));
app.use(express.static(env.asset_dir));
app.use('/bower_components', express.static(__dirname + '/../bower_components'));

// parse application/json
app.use(bodyParser.json());
if (env.livereload) app.use(require('connect-livereload')());

app.post('/api/login', function login(req, res) {
  const options = {
    url: `${env.oauth_server}/oauth/token`, auth,
    form: {
      grant_type: 'authorization_code',
      redirect_uri: `${env.hire.redirect_uri}`,
      code: req.body.code,
    },
  };

  request.post(options, env.handleResponse(res));
});

app.post('/api/refresh', function login(req, res) {
  const options = {
    url: `${env.oauth_server}/oauth/token`, auth,
    form: {
      grant_type: 'refresh_token',
      refresh_token: req.body.refresh_token,
    },
  };

  request.post(options, env.handleResponse(res));
});

app.post('/api/logout', function login(req, res) {
  const options = {
    url: `${env.oauth_server}/oauth/token/${req.body.access_token}`, auth,
  };

  request.del(options, env.handleResponse(res));
});

app.get('/*', (req, res) => res.sendFile('hire.html', { root: `${env.asset_dir}/html` }));

module.exports = app;
