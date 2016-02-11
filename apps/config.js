const config = {
  development: {
    OAUTH_SERVER: process.env.OAUTH_SERVER || 'http://api.quezx.dev',
    OAUTH_ENDPOINT: process.env.OAUTH_ENDPOINT || '/oauth/token',
    OAUTH_CLIENT: process.env.OAUTH_CLIENT || 'quezxrecruiterappid',
    OAUTH_SECRET: process.env.OAUTH_SECRET || 'quezxrecruiterappsecret',
    OAUTH_REDIRECT_URI: process.env.OAUTH_REDIRECT_URI || 'http://hire.quezx.dev/oauth/quezx',
    livereload: true,
  },
  production: {
    OAUTH_SERVER: process.env.OAUTH_SERVER || 'https://api.quezx.com',
    OAUTH_ENDPOINT: process.env.OAUTH_ENDPOINT || '/oauth/token',
    OAUTH_CLIENT: process.env.OAUTH_CLIENT,
    OAUTH_SECRET: process.env.OAUTH_SECRET,
    OAUTH_REDIRECT_URI: process.env.OAUTH_REDIRECT_URI || 'https://hire.quezx.com/oauth/quezx',
  },
};

module.exports = config[process.env.NODE_ENV || 'development'];
