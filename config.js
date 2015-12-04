const config = {
  development: {
    OAUTH_SERVER: process.env.OAUTH_SERVER || 'http://localhost:3001',
    OAUTH_ENDPOINT: process.env.OAUTH_ENDPOINT || '/token',
    OAUTH_CLIENT: process.env.OAUTH_CLIENT || 'fmQniRjBba0smlKKcrNoHPXA7UidmYhL.quetzalapp',
    OAUTH_SECRET: process.env.OAUTH_SECRET || 'qpOENjMwsK7nN0Ib336zTjLxcerEeitn48h7unVwmzvEBbMRrGsFS4Tq7g2ktE49',
  },
  production: {
    OAUTH_SERVER: process.env.OAUTH_SERVER || 'testapi.quezx.com',
    OAUTH_ENDPOINT: process.env.OAUTH_ENDPOINT || '/token',
    OAUTH_CLIENT: process.env.OAUTH_CLIENT,
    OAUTH_SECRET: process.env.OAUTH_SECRET,
  },
};

module.exports = config[process.env.NODE_ENV || 'development'];
