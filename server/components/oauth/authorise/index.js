const debug = require('debug');
const rp = require('request-promise');
const { ip, port, MASTER_TOKEN } = require('../../../config/environment');

const log = debug('server-api-applicant');

module.exports = (username) => {
  log('authorise', username);
  return rp({
    method: 'POST',
    uri: `http://${ip}:${port}/authorise?token=${MASTER_TOKEN}`,
    form: {
      grant_type: 'loginAs',
      username,
    },
  });
};
