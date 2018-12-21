const moment = require('moment');

const { SMTP_USER, BCC_EMAIL } = require('../../config/environment');
const logger = require('../../components/logger');

const ses = require('../../conn/email/ses');
const { EventEmitter } = require('./comment.socket');

exports.create = (req, res) => {
  const {
    comment,
    applicant,
    job,
    actingUser,
    consultant,
    ENV,
  } = req.body;

  // - Informing to Socket
  EventEmitter.emit('create', comment);

  if (actingUser.ASPIRE) {
    ses
      .sendTemplatedEmail({
        Source: `"QuezX.com" <${SMTP_USER}>`,
        Destination: {
          ToAddresses: [consultant.email_id],
          BccAddresses: [BCC_EMAIL],
        },
        Template: 'trans-new_m-candidate-comment',
        TemplateData: JSON.stringify({
          applicant_name: applicant.name,
          consutant_name: applicant.consultant_username,
          client_name: job.client_name,
          job_position: job.role,
          applicant_status: applicant.state_name,
          comment: comment.comment,
          updated_on: moment(comment.updated_on).format('Do MMM YYYY'),
          link: `${ENV.URLS_PARTNER}/applicants/${applicant.id}`,
        }),
      })
      .catch(err => logger.error(err));
  }

  return res.status(200).end();
};

