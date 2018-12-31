const getTemplate = require('../../../conn/email/ses/render');

const TemplateName = __dirname.split('/').slice(-2).join('_');

module.exports = {
  TemplateData: {
    password: 'ThisISAPSS',
    name: 'Vishal Narwade',
  },
  Meta: {
    group_id: 5,
    description: 'Analytics user login credentials.',
  },
  Template: {
    TemplateName,
    SubjectPart: 'Login password',
    HtmlPart: getTemplate({
      TemplateName,
      afterContent: [],
    }),
  },
};
