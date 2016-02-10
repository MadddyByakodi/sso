const config = {
  development: {
    OAUTH_SERVER: process.env.OAUTH_SERVER || 'http://api.quezx.dev',
    OAUTH_ENDPOINT: process.env.OAUTH_ENDPOINT || '/oauth/token',
    OAUTH_CLIENT: process.env.OAUTH_CLIENT || 'quezxrecruiterappid',
    OAUTH_SECRET: process.env.OAUTH_SECRET || 'quezxrecruiterappsecret',
  },
  production: {
    OAUTH_SERVER: process.env.OAUTH_SERVER || 'https://api.quezx.com',
    OAUTH_ENDPOINT: process.env.OAUTH_ENDPOINT || '/oauth/token',
    OAUTH_CLIENT: process.env.OAUTH_CLIENT,
    OAUTH_SECRET: process.env.OAUTH_SECRET,
  },
};

module.exports = config[process.env.NODE_ENV || 'development'];
