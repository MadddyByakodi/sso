const { MASTER_TOKEN } = require('../../config/environment/index');

function index() {
  return (req, res, next) => {
    if (req.query.token && req.query.token === MASTER_TOKEN) {
      return next();
    }
    return res.status(401).end();
  };
}

module.exports = index;
