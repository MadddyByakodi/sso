const config = {
  development: {
    OAUTH_SERVER: process.env.OAUTH_SERVER || 'http://localhost:3001',
    OAUTH_ENDPOINT: process.env.OAUTH_ENDPOINT || '/token',
    OAUTH_CLIENT: process.env.OAUTH_CLIENT || 'L13j99oJx6a5I2073m3Me98bt1BOJaUq.quetzalapp',
    OAUTH_SECRET: process.env.OAUTH_SECRET || '6bh8cD2Ox9MUBQMlLHSB3taxxZspUVZZZKfdzjjyhCb9YVqib2dxHFBlUtlgpnNp',
  },
  production: {
    OAUTH_SERVER: process.env.OAUTH_SERVER || 'testapi.quezx.com',
    OAUTH_ENDPOINT: process.env.OAUTH_ENDPOINT || '/token',
    OAUTH_CLIENT: process.env.OAUTH_CLIENT,
    OAUTH_SECRET: process.env.OAUTH_SECRET,
  },
};

module.exports = config[process.env.NODE_ENV || 'development'];
