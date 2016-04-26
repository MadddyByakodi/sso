const def = {
  domain: process.env.DOMAIN,
  prefix: process.env.PREFIX,
  asset_dir: process.env.ASSET_DIR,
  accounts: {
    client: process.env.ACCOUNTS_CLIENT || 'accountsquezx',
    secret: process.env.ACCOUNTS_SECRET || 'accountsquezxsecret',
    port: process.env.ACCOUNTS_PORT || 3001,
  },
  hire: {
    client: process.env.HIRE_CLIENT || 'hirequezx',
    secret: process.env.HIRE_SECRET || 'hirequezxsecret',
    port: process.env.ACCOUNTS_PORT || 3002,
  },
  partner: {
    client: process.env.PARTNER_CLIENT || 'partnerquezx',
  },
};

const config = {
  development: Object.assign({}, def, {
    domain: def.domain || 'quezx.dev',
    prefix: def.prefix || 'http://',
    asset_dir: def.asset_dir || `${__dirname}/../dist`,
    livereload: true, // livereload in development
  }),
  production: Object.assign({}, def, {
    domain: def.domain || 'quezx.com',
    prefix: def.prefix || 'https://',
    asset_dir: def.asset_dir || `${__dirname}/../assets`,
  }),
  staging: Object.assign({}, def, {
    domain: def.domain || 'quezx.com',
    prefix: def.prefix || 'https://staging-',
    asset_dir: def.asset_dir || `${__dirname}/../assets`,
  }),
};

const conf = config[process.env.NODE_ENV || 'development'];
conf.oauth_server = `${conf.prefix}api.${conf.domain}`;
conf.hire.redirect_uri = `${conf.prefix}hire.${conf.domain}/access/oauth`;
conf.partner.redirect_uri = `${conf.prefix}partner.${conf.domain}/access/oauth`;

conf.handleResponse = function handleResponse(res) {
  return function sendResponse(err, apires, body) {
    if (err) return res.status(500).send(err);
    return res.status(apires.statusCode).send(body);
  };
};

module.exports = conf;
