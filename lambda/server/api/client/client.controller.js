const logger = require('../../components/logger');
const { SMTP_USER, BCC_EMAIL } = require('../../config/environment/index');
const ses = require('../../conn/email/ses/index');

exports.payments = (req, res) => {
  const { emails, paymentMigrate } = req.body;
  ses.sendTemplatedEmail({
    Source: `"QuezX.com" <${SMTP_USER}>`,
    Destination: {
      ToAddresses: emails,
      BccAddresses: [BCC_EMAIL],
    },
    Template: 'trans_m-client-QD-migration',
    TemplateData: JSON.stringify(paymentMigrate),
  }).then(() => res.status(200).end())
    .catch(err => logger.error(err));
};
