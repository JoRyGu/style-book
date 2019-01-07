const axios = require('axios');
const server = require('../../src/server');
const baseRoute = 'http://localhost:5000/api';
const Stylist = require('../../src/db/models').Stylist;
const sequelize = require('../../src/db/models/index').sequelize;
const hashPassword = require('../../helpers/hashPassword');

describe('Login Routes', () => {
  beforeEach(async (done) => {
    this.stylist;
    await sequelize.sync({ force: true });
    const hashedPassword = await hashPassword('password');

    this.stylist = await Stylist.create({
      id: 1,
      email: 'joanna@fake.net',
      password: hashedPassword,
      firstName: 'Joanna',
      lastName: 'Smith'
    });

    done();
  });

  describe('POST http://localhost:5000/api/v1/login', () => {
    it('Should return a JSON response containing the JWT Token for the stylist', async (done) => {
      try {
        const response = await axios({
          method: 'post',
          url: `${baseRoute}/v1/login`,
          data: {
            email: 'joanna@fake.net',
            password: 'password'
          }
        });
        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.token).toContain('Bearer ');
      } catch(error) {
        expect(error).toBeNull();
      }

      done();
    });

    it('Should return a JSON response containing an error if no email is sent', async (done) => {
      try {
        const response = await axios({
          method: 'post',
          url: `${baseRoute}/v1/login`,
          data: {
            password: 'password'
          }
        })
      } catch(error) {
        expect(error.response.data.email).toBe('Email field is required.');
      }
      done();
    });

    it('Should return a JSON response containing an error if no password is sent', async (done) => {
      try {
        const response = await axios({
          method: 'post',
          url: `${baseRoute}/v1/login`,
          data: {
            email: 'joanna@fake.net'
          }
        });
      } catch(error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.password).toBe('Password field is required.');
      }
      done();
    });

    it('Should return a JSON response containing an error if no stylist is found with email sent', async (done) => {
      try {
        const response = await axios({
          method: 'post',
          url: `${baseRoute}/v1/login`,
          data: {
            email: 'jane@fake.net',
            password: 'password'
          }
        });
      } catch(error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error).toBe('Stylist not found with that email.');
      }

      done();
    });

    it('Should return a JSON response containing an error if the password does not match database', async (done) => {
      try {
        const response = await axios({
          method: 'post',
          url: `${baseRoute}/v1/login`,
          data: {
            email: 'joanna@fake.net',
            password: 'snuffleupagus'
          }
        });
      } catch(error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error).toBe('Incorrect email or password.');
      }
      done();
    })
  })
})