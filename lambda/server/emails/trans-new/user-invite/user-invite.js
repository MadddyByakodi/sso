const getTemplate = require('../../../conn/email/ses/render');

const TemplateName = __dirname.split('/').slice(-2).join('_');

module.exports = {
  TemplateData: {
    invitee: 'Digender Mahara',
    inviter: 'Neha',
    loginLink: 'http://analytics.quezx.test',
    username: 'digende@quetzal.in',
    password: 'a65s4dsad',
  },
  Meta: {
    group_id: 4,
    description: 'User invite email',
  },
  Template: {
    TemplateName,
    SubjectPart: ' {{inviter}} has invited you to join QuezX.com',
    HtmlPart: getTemplate({
      TemplateName,
      afterContent: [],
    }),
  },
};
