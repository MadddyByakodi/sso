const moment = require('moment');
const { DOMAIN, PREFIX } = require('../../config/environment/index');

const request = require('supertest');
const app = require('../../app');

describe('POST /api/clients', () => {
  it('return clients', (done) => {
    request(app)
      .post('/api/clients')
      .send({
        email: 'manjeshpv@email.com',
        applicantDetails: {
          applicant_name: 'Manjesh',
          consutant_name: 'Vignesh',
          client_name: 'Infosys',
          job_position: 'Nodejs Developer',
          applicant_status: 'Personal Interview',
          comment: 'I just reached interview location',
          updated_on: moment().format('Do MMM YYYY'),
          link: `${PREFIX}partner.${DOMAIN}/applicants/1`,
        },
      })
      .expect(200)
      .then(done);
  });
});
