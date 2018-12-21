const moment = require('moment');
const { URLS_AUTH } = require('../../config/environment');

const request = require('supertest');
const app = require('../../app');

describe('POST /api/users/magiclink', () => {
  it('return magiclink', (done) => {
    request(app)
      .post('/api/users/magiclink')
      .send({
        user: { email: 'manjeshpv@email.com' },
        otp: 'abcd',
        ENV: {
          URLS_AUTH: 'http://auth.quezx.com',
        },
      })
      .expect(201)
      .then(() => {
        done();
      });
  });
});
