const { APPS } = require('../../config/constants');
const { informToRelatedApps, signup } = require('./user.service');

describe('POST /api/users/invite', () => {
  it('should send users invite', (done) => {
    informToRelatedApps({
      user: {
        id: ,
        email: 'manjeshpv@gmail.com',
        first_name: 'Manjesh',
        last_name: 'V',
      },
      appId: APPS.ANALYTICS,
    })
      .then(() => done());
  });
});

describe('POST /api/users/create', () => {
  it('should send users invite', (done) => {
    signup({
      body: {
        email: 'an1ish.lushte@gmail.com',
        first_name: 'Anish',
        last_name: 'Lushte',
        source_app_id: 3
      },
    })
      .then(() => done());
  });
});
