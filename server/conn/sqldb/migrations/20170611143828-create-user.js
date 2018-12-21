const {
  engine, timestamps, keys, properties,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('users', Object
      .assign(properties('user', DataTypes), {
        group_id: keys('groups'),
      }, timestamps(3, DataTypes)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('users');
  },
};
