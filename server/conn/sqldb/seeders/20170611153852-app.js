const { app } = require('./../constants');

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert(
      'apps', app,
      {},
    );
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('apps', { id: app.map(x => x.id) });
  },
};
