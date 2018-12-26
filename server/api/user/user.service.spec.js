const { APPS } = require('../../config/constants');
const { informToRelatedApps } = require('./user.service');

describe('POST /api/users/invite', () => {
  it('should send users invite', (done) => {
    informToRelatedApps({
      user: {
        id: 1,
        email: 'manjeshpv@gmail.com',
        first_name: 'Manjesh',
        last_name: 'V',
      },
      appId: APPS.ANALYTICS,
    })
      .then(() => done());
  });
});
