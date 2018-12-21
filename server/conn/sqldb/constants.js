const r = require;
const _ = require('lodash');
const infleciton = require('lodash-inflection');

_.mixin(infleciton);

const keyValueMap = (objects, key, value) => objects
  .reduce((acc, object) => Object
    .assign(acc, {
      [object[key].toUpperCase()]: object[value],
    }), {});

const map = {
};

const constants = {};

[
  { name: 'group' },
  { name: 'user', keyMap: false },
  { name: 'app' },
]
  .forEach(({ name, keyMap = true }) => {
    const model = _.singularize(_.camelCase(name));
    const data = r(`./../../api/${model}/${model}.seed.js`)(constants);
    // - used for dependency injection
    constants[_.camelCase(name)] = data;
    // - for writing contant names instead of number like instead of 1 for group_id we write OPS
    if (keyMap !== false) {
      constants[name.toUpperCase()] = keyValueMap(data, map[name] || 'name', 'id');
    }
  });

module.exports = constants;
