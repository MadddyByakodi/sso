const request = require('supertest');

const app = require('../../app');
const { MASTER_TOKEN } = require('../../config/environment');

describe('accounts Login GET /authorize', () => {
  it('respond with access tokens', (done) => {
    request(app)
      .post(`/authorise?token=${MASTER_TOKEN}`)
      .send({
        grant_type: 'loginAs',
        username: 'manjeshpv@gmail.com',
      })
      .expect('Content-Type', /json/)
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .expect(200)
      .then(done());
  });
});
