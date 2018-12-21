const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const pkg = require('../../package.json');

const root = path.normalize(`${__dirname}/../..`);
const envFile = path.join(root, '.env');
let config = {};
const { log } = console;
let env = {};
if (fs.existsSync(envFile)) {
  env = dotenv.config({ path: envFile });
  process.env.DEBUG = env.DEBUG;
  config = env;
} else {
  log(`.env file not found.
  Please create manually or visit http://localhost:3000
  Learn more at check installation docs at https://github.com/quezx/api/blob/${pkg.version}/docs/Installation.md
  Trying to connect with default settings.
  `);
}

process.env.NODE_ENV = config.NODE_ENV || process.env.NODE_ENV || 'production';

const {
  QUARC_MYSQL_DB, QUARC_MYSQL_USER, QUARC_MYSQL_PASS, QUARC_MYSQL_HOST,
} = config;

const settings = {
  database: QUARC_MYSQL_DB || 'gloryque_quarc',
  username: QUARC_MYSQL_USER || 'gloryque_quarc',
  password: QUARC_MYSQL_PASS || '',
  dialect: 'mysql',
  host: QUARC_MYSQL_HOST || '127.0.0.1',
  port: 3306,
  seederStorage: 'sequelize',
};

module.exports = {
  development: settings,
  test: settings,
  production: settings,
};
