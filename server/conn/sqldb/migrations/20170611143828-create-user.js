const {
  engine, timestamps, properties,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('users', Object
      .assign(properties('user', DataTypes), {
      }, timestamps(3, DataTypes)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('users');
  },
};
