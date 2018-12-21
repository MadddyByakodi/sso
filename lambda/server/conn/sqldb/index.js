const moment = require('moment');
const Sequelize = require('sequelize');
const _ = require('lodash');

const config = require('../../config/environment/index');

const db = {
  Sequelize,
  sequelize: Sequelize,
  sequelizeQuarc: new Sequelize(
    config.quarc.database, config.quarc.username,
    config.quarc.password, config.quarc,
  ),
  sequelizeQuantum: new Sequelize(
    config.quantum.database, config.quantum.username,
    config.quantum.password, config.quantum,
  ),
  helpers: {
    concat(field, msg) {
      return Sequelize.fn(
        'CONCAT',
        Sequelize.fn(
          'COALESCE',
          Sequelize.col(field), '',
        ),
        `${moment().toString()}: ${msg}\n`,
      );
    },
  },
};

[
  'EmailTemplate', 'EmailTemplateAd', 'Ad', 'EmailPreference',
  'EmailLog', 'EmailOpen', 'EmailClick', 'EmailDelivery',
]
  .forEach((model) => {
    db[model] = db.sequelizeQuarc
      .import(`../../api/${_.camelCase(model)}/${_.camelCase(model)}.model`);
  });

[
  'User',
]
  .forEach((model) => {
    db[model] = db.sequelizeQuantum
      .import(`../../api/${_.camelCase(model)}/${_.camelCase(model)}.model`);
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = db;
