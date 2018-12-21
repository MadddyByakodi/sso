const request = require('supertest');

const app = require('../../app');
const {MASTER_TOKEN} = require('../../config/environment');
const jwt = require('./../../components/jwt');

// describe('accounts Login GET /authorize', () => {
//   it('respond with access tokens', (done) => {
//     const otp = jwt.sign({
//       id: 1,
//       first_name: 'Manjesh',
//       last_name: 'V',
//       email: 'manjeshpv@gmail.com',
//     });
//
//     console.log({otp})
//     request(app)
//       .get(`/api/users/authorise?token=${MASTER_TOKEN}&otp=${otp}`)
//       .expect('Content-Type', /plain/)
//       .expect(302)
//       .then(() => done());
//   });
// });
//
// describe('GET /api/users/autoIncrementValue', () => {
//   it('return AI value', (done) => {
//     request(app)
//       .get(`/api/users/autoIncrementValue?token=${MASTER_TOKEN}`)
//       .expect('Content-Type', /plain/)
//       .expect(302)
//       .then(() => done());
//   });
// });
//
// describe('1 POST /api/users', () => {
//   it('should save the user and return { id }', (done) => {
//     request(app)
//       .post(`/api/users?token=${MASTER_TOKEN}`)
//       .send({
//         id: 1,
//         title: 'Mr',
//         first_name: 'Manjesh',
//         last_name: 'V',
//         email: 'manjeshpv@gmail.com',
//       })
//       .expect('Content-Type', /json/)
//       .expect(201)
//       .then(() => done());
//   });
// });
//
// describe('POST /api/users with hooks disabled', () => {
//   it('should save the user and return { id }', (done) => {
//     request(app)
//       .post(`/api/users?token=${MASTER_TOKEN}`)
//       .send({
//         id: 1,
//         first_name: 'Manjesh',
//         last_name: 'V',
//         email: 'manjeshpv@gmail.com',
//         hooks: false,
//       })
//       .expect('Content-Type', /json/)
//       .expect(201)
//       .then(() => done());
//   });
// });

describe('POST /api/users/magiclink', () => {
  it('should send magiclink', (done) => {
    request(app)
      .post('/api/users/magiclink')
      .send({
        email: 'manjeshpv@gmail.com',
      })
      .expect(201)
      .then(() => done());
  });
});

