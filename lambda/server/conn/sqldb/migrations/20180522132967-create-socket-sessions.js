
const {
  engine, timestamps, properties, id,
} = require('../helper.js');

module.exports = {
  up: (queryInterface, DataTypes) => queryInterface
    .createTable('socket_sessions', {
      id,
      ...properties('socketSession', DataTypes),
      ...timestamps(2, DataTypes),
    }, engine),
  down(queryInterface) {
    return queryInterface.dropTable('socket_sessions');
  },
};
