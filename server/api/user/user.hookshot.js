const { URLS_ACCOUNTS } = require('../../config/environment');
const hookshot = require('../../conn/hookshot');

exports.magiclink = ({ email, otp }) => {
  console.log(email, otp);
  hookshot.trigger('user:magiclink', {
    object: 'user',
    event: 'magiclink',
    user: {
      email,
    },
    otp,
    ENV: { URLS_ACCOUNTS },
  });
};
