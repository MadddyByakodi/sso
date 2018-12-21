/**
 * Express configuration
 */

const favicon = require('serve-favicon');
const errorHandler = require('errorhandler');
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const responseTime = require('response-time');

const db = require('../conn/sqldb');
const routes = require('../routes');
const config = require('./environment');
const rateLimit = require('./ratelimit');
const logger = require('../components/logger');
const oauthComponent = require('./../components/oauth/express');
const { activityLogger, apiLogger } = require('../components/log');
const required = require;

module.exports = (app) => {
  const env = app.get('env');
  app.use((req, res, next) => {
    res.on('finish', () => activityLogger({ db })(req, res, next));
    next();
  });
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
  app.enable('trust proxy');
  app.use(responseTime());
  app.use(apiLogger(db));
  app.use(helmet());
  app.use(rateLimit('api', db));
  app.use(logger.transports.sentry.raven.requestHandler(true));
  app.set('view engine', 'jade');
  app.set('views', `${config.root}/server/app`);
  app.set('appPath', path.join(config.root, 'client'));
  if (env === 'production') {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
  }

  if (env === 'development') {
    app.use(required('connect-livereload')({
      ignore: [
        /^\/api\/(.*)/,
        /\.js(\?.*)?$/, /\.css(\?.*)?$/, /\.svg(\?.*)?$/, /\.ico(\?.*)?$/, /\.woff(\?.*)?$/,
        /\.png(\?.*)?$/, /\.jpg(\?.*)?$/, /\.jpeg(\?.*)?$/, /\.gif(\?.*)?$/, /\.pdf(\?.*)?$/,
      ],
    }));
  }

  if (env === 'development' || env === 'test') {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }

  if (env === 'development' || env === 'test') {
    app.use(express.static(path.join(config.root, '.tmp')));
  }


  if (env === 'development') {
    /* eslint global-require:0 */
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const stripAnsi = require('strip-ansi');
    const webpack = require('webpack');
    const makeWebpackConfig = require('../../webpack.make');
    const webpackConfig = makeWebpackConfig({ DEV: true });
    const compiler = webpack(webpackConfig);
    const browserSync = require('browser-sync').create();

    /**
     * Run Browsersync and use middleware for Hot Module Replacement
     */
    browserSync.init({
      open: false,
      logFileChanges: false,
      proxy: `localhost:${config.port}`,
      ws: false,
      middleware: [
        webpackDevMiddleware(compiler, {
          noInfo: false,
          stats: { colors: true, timings: true, chunks: false },
        }),
      ],
      ui: false,
      port: config.browserSyncPort,
      plugins: ['bs-fullscreen-message'],
    });

    /**
     * Reload all devices when bundle is complete
     * or send a fullscreen error message to the browser instead
     */
    compiler.plugin('done', (stats) => {
      if (stats.hasErrors() || stats.hasWarnings()) {
        return browserSync.sockets.emit('fullscreen:message', {
          title: 'Webpack Error:',
          body: stripAnsi(stats.toString()),
          timeout: 100000,
        });
      }
      return browserSync.reload();
    });
  }

  if (env === 'development' || env === 'test') {
    app.use(errorHandler()); // Error handler - has to be last
  }

  oauthComponent(app, routes, rateLimit('auth', db));
};
