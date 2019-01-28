const ses = require('../../conn/ses');
const { SMTP_USER, BCC_EMAIL } = require('./../../config/environment');

exports.create = async (req, res, next) => {
  try {
    const {
      ENV: {
        URLS_ACCOUNTS,
      },
      user,
      token,
    } = req.body;

    await ses.sendTemplatedEmail({
      ConfigurationSetName: 'high_priority',
      Source: `"QuezX.com" <${SMTP_USER}>`,
      Destination: {
        ToAddresses: [user.email_id],
        BccAddresses: [BCC_EMAIL],
      },
      Template: 'trans-new_u-password-reset',
      TemplateData: JSON.stringify({
        userName: user.name,
        forgotPwdLink: `${URLS_ACCOUNTS}/password-reset?id=${user.id}&token=${token}`,
      }),
    });

    return res.end();
  } catch (ex) {
    return next(ex);
  }
};
