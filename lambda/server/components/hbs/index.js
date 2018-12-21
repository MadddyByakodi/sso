const handlebars = require('handlebars');

const hbs = {
  render(data, full) {
    const template = full;
    return handlebars.compile(template)(Object.assign(hbs.defaults[template] || {}, data));
  },
};

module.exports = hbs;
