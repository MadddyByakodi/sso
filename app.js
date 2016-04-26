const env = require('./apps/config');
require('./apps/accounts').listen(env.accounts.port);
require('./apps/hire').listen(env.hire.port);
