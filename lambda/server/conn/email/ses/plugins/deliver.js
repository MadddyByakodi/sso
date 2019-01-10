const debug = require('debug');
const quarc = require('../connection');


const log = debug('conn/email/ses/plugins/deliver');

module.exports = async ([params, emailLog]) => {
  log('deliver', params);
  return quarc.sendTemplatedEmailAsync(params)
    .then(status => [params, { ...emailLog, message_id: status.MessageId }]);
};
