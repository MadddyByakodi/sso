const request = require('supertest');
const assert = require('assert');
const app = require('./app');

describe('GET /', () => {
  it('return version and name', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body: { version } }) => {
        assert(version === '0.1.0', 'version');
        done();
      });
  });
});
