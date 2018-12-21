const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const root = path.normalize(`${__dirname}/../../..`);

if (!fs.existsSync(path.join(root, '.env'))) {
  fs.writeFileSync(path.join(root, '.env'), fs.readFileSync(path.join(root, '.env.sample')));
}

const env = dotenv.config({ path: path.join(root, '.env') });
const { PREFIX, DOMAIN } = env.parsed;
const config = {
  all: {
    env: process.env.NODE_ENV,
    // Server port
    port: process.env.PORT || 4000,
    ip: process.env.IP || '0.0.0.0',
    root,
    URLS_ACCOUNTS: `${PREFIX}accounts.${DOMAIN}`,
    // Browser-sync port
    browserSyncPort: process.env.BROWSER_SYNC_PORT || 3001,
  },
  development: {

  },

  staging: {

  },

  production: {

  },
};

const conf = Object.assign(env.parsed, config.all, config[process.env.NODE_ENV || 'development']);

module.exports = conf;

