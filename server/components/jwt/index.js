const expressJwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');

const {
  MASTER_TOKEN,
} = require('../../config/environment');

exports.authenticate = expressJwt({
  secret: MASTER_TOKEN,
  getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.access_token) {
      return req.query.access_token;
    }

    return null;
  },
});


exports.sign = user => jsonwebtoken.sign(user, MASTER_TOKEN);
