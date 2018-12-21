const path = require('path');
const dotenv = require('dotenv');

const root = path.normalize(`${__dirname}/../../..`);

const env = dotenv.config({ path: path.join(root, '.env') });
const logger = require('../../components/logger');

const config = {
  all: {
    env: env.NODE_ENV,
    port: env.PORT || 2002,
    ip: env.IP || '0.0.0.0',
    root,
  },
  development: {
    quarc: {
      username: process.env.QUARC_MYSQL_USER,
      password: process.env.QUARC_MYSQL_PASS,
      database: process.env.QUARC_MYSQL_DB,
      host: process.env.QUARC_MYSQL_HOST,
      dialect: 'mysql',
      logger,
      timezone: '+05:30',
    },
    quantum: {
      username: process.env.QUANTUM_MYSQL_USER,
      password: process.env.QUANTUM_MYSQL_PASS,
      database: process.env.QUANTUM_MYSQL_DB,
      host: process.env.QUANTUM_MYSQL_HOST,
      dialect: 'mysql',
      logger,
      timezone: '+05:30',
    },
    MINIO: {
      endPoint: process.env.MINIO_ENDPOINT,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
      secure: false,
      port: 8000,
    },
  },

  test: {
    quarc: {
      username: process.env.QUARC_MYSQL_USER,
      password: process.env.QUARC_MYSQL_PASS,
      database: process.env.QUARC_MYSQL_DB,
      host: process.env.QUARC_MYSQL_HOST,
      dialect: 'mysql',
      logger,
      timezone: '+05:30',
    },
    quantum: {
      username: process.env.QUANTUM_MYSQL_USER,
      password: process.env.QUANTUM_MYSQL_PASS,
      database: process.env.QUANTUM_MYSQL_DB,
      host: process.env.QUANTUM_MYSQL_HOST,
      dialect: 'mysql',
      logger,
      timezone: '+05:30',
    },
    MINIO: {
      endPoint: process.env.MINIO_ENDPOINT,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
      secure: false,
      port: 8000,
    },
  },

  production: {
    quarc: {
      username: process.env.QUARC_MYSQL_USER,
      password: process.env.QUARC_MYSQL_PASS,
      database: process.env.QUARC_MYSQL_DB,
      host: process.env.QUARC_MYSQL_HOST,
      dialect: 'mysql',
      logging: false,
      timezone: '+05:30',
    },
    quantum: {
      username: process.env.QUANTUM_MYSQL_USER,
      password: process.env.QUANTUM_MYSQL_PASS,
      database: process.env.QUANTUM_MYSQL_DB,
      host: process.env.QUANTUM_MYSQL_HOST,
      dialect: 'mysql',
      logging: false,
      timezone: '+05:30',
    },
    MINIO: {
      endPoint: process.env.MINIO_ENDPOINT,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
      secure: true,
      port: 443,
    },
  },
};

const conf = Object.assign(env, config.all, config[process.env.NODE_ENV || 'development']);

module.exports = conf;
