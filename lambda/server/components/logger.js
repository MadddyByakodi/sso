const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const Sentry = require('winston-raven-sentry');

const { root, NODE_ENV, SENTRY_DSN } = require('../config/environment/index');

const logger = new winston.Logger({
  transports: [
    new DailyRotateFile({
      silent: NODE_ENV !== 'production',
      name: 'error-file',
      datePattern: '.yyyy-MM-dd.log',
      filename: `${root}/logs/lamda/lamda`,
    }),
    new Sentry({
      dsn: NODE_ENV === 'production' && SENTRY_DSN,
      install: true,
      config: { environment: NODE_ENV, release: '@@_RELEASE_' },
      level: 'error',
    }),
    new (winston.transports.Console)({
      name: 'console',
      level: 'debug',
      silent: NODE_ENV === 'production',
    }),
  ],
});

module.exports = logger;
