const config = {
  development: {
    OAUTH_SERVER: process.env.OAUTH_SERVER || 'http://api.quezx.dev',
    OAUTH_ENDPOINT: process.env.OAUTH_ENDPOINT || '/oauth/token',
    ACCOUNTS_CLIENT: process.env.ACCOUNTS_CLIENT || 'accountsquezx',
    ACCOUNTS_SECRET: process.env.ACCOUNTS_SECRET || 'accountsquezxsecret',
    HIRE_CLIENT: process.env.HIRE_CLIENT || 'hirequezx',
    HIRE_SECRET: process.env.HIRE_SECRET || 'hirequezxsecret',
    HIRE_REDIRECT_URI: process.env.HIRE_REDIRECT_URI || 'http://hire.quezx.dev/oauth/quezx',
    PARTNER_CLIENT: process.env.PARTNER_CLIENT || 'partnerquezx',
    PARTNER_SECRET: process.env.PARTNER_SECRET || 'partnerquezxsecret',
    PARTNER_REDIRECT_URI: process.env.PARTNER_REDIRECT_URI || 'http://hire.quezx.dev/oauth/quezx',
    ASSET_DIR: process.env.ASSET_DIR || `${__dirname}/../dist`,
    livereload: true,
  },
  production: {
    OAUTH_SERVER: process.env.OAUTH_SERVER || 'https://api.quezx.com',
    OAUTH_ENDPOINT: process.env.OAUTH_ENDPOINT || '/oauth/token',
    ACCOUNTS_CLIENT: process.env.ACCOUNTS_CLIENT || 'accountsquezx',
    ACCOUNTS_SECRET: process.env.ACCOUNTS_SECRET || 'accountsquezxsecret',
    HIRE_CLIENT: process.env.HIRE_CLIENT || 'hirequezx',
    HIRE_SECRET: process.env.HIRE_SECRET || 'hirequezxsecret',
    HIRE_REDIRECT_URI: process.env.HIRE_REDIRECT_URI || 'https://hire.quezx.com/oauth/quezx',
    PARTNER_CLIENT: process.env.PARTNER_CLIENT || 'partnerquezx',
    PARTNER_SECRET: process.env.PARTNER_SECRET || 'partnerquezxsecret',
    PARTNER_REDIRECT_URI: process.env.PARTNER_REDIRECT_URI || 'https://partner.quezx.com/oauth/quezx',
    ASSET_DIR: process.env.ASSET_DIR || `${__dirname}/../assets`,
  },
};

const conf = config[process.env.NODE_ENV || 'development'];

conf.handleResponse = function handleResponse(res) {
  return function sendResponse(err, apires, body) {
    if (err) return res.status(500).send(err);
    return res.status(apires.statusCode).send(body);
  };
};

module.exports = conf;
