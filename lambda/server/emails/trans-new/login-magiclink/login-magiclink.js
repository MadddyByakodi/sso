const getTemplate = require('../../../conn/email/ses/render');

const TemplateName = __dirname.split('/').slice(-2).join('_');

module.exports = {
  TemplateData: {
    link: 'http://staging-aspire.quezx.com',
  },
  Meta: {
    group_id: 4,
    description: 'Candidate Magic link',
  },
  Template: {
    TemplateName,
    SubjectPart: 'Magic sign-in link for QuezX',
    HtmlPart: getTemplate({
      TemplateName,
      afterContent: [],
    }),
  },
};
