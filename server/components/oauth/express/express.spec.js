const request = require('supertest');
const fs = require('fs');

const app = require('../../../app');
const { root } = require('../../../config/environment');

describe('accounts Login GET /api/user/login', () => {
  it('respond with access tokens', (done) => {
    request(app)
      .post('/oauth/token')
      .send({
        username: 'manjeshpv@gmail.com',
        password: 'admin1234',
      })
      .expect('Content-Type', /json/)
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .expect(200)
      .then((res) => {
        fs.writeFileSync(`${root}/logs/credentials.json`, JSON.stringify(res.body));
        done();
      });
  });
});
