const axios = require('axios');
const bcrypt = require('bcryptjs');
const server = require('../../src/server');
const baseRoute = 'http://localhost:5000/api';
const sequelize = require('../../src/db/models/index').sequelize;
const stylist = require('../../src/db/models').Stylist;
const client = require('../../src/db/models').Client;
const { Stylist, Client } = require('../../src/db/queries');

describe('Client Routes', () => {
  beforeEach(async (done) => {
    this.stylist;
    this.client;
    const password = await bcrypt.hash('password', await bcrypt.genSalt(10));
    await sequelize.sync({ force: true });

    this.stylist = await stylist.create({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jdoe@fake.net',
      password
    });

    this.client = await client.create({
      firstName: 'John',
      lastName: 'Smith',
      phoneNumber: '867-5309',
      stylistId: 1
    });

    done();
  })

  describe('GET /api/v1/:stylistId/clients', () => {
    it('Should return a JSON object containing an array of the relevant client information.', async (done) => {
      const login = await axios({
        method: 'post',
        url: `${baseRoute}/v1/login`,
        data: {
          email: 'jdoe@fake.net',
          password: 'password'
        }
      });

      const clients = await axios({
        method: 'get',
        url: `${baseRoute}/v1/1/clients`,
        headers: {
          Authorization: login.data.token
        }
      });

      expect(clients.data.clients[0].firstName).toBe('John');
      expect(clients.data.clients[0].lastName).toBe('Smith');
      done();
      
    });

    it('Should return "Unauthorized" if the user is not logged in when accessing this route.', async (done) => {
      try {
        const clients = await axios({
          method: 'get',
          url: `${baseRoute}/v1/1/clients`
        });
  
      } catch(error) {
        expect(error.response.status).toBe(401);
        expect(error.response.data).toBe('Unauthorized');
        done();
      }
      
    });

    it('Should return "Unauthorized" if the user that is logged in does not match the stylist id in the route.', async (done) => {
      const password = await bcrypt.hash('password', await bcrypt.genSalt(10));
      const newStylist = await stylist.create({
        firstName: 'Darth',
        lastName: 'Vader',
        email: 'vader@deathstar.gov',
        password
      });

      const login = await axios({
        method: 'post',
        url: `${baseRoute}/v1/login`,
        data: {
          email: 'vader@deathstar.gov',
          password: 'password'
        }
      });

      try {
        const clients = await axios({
          method: 'get',
          url: `${baseRoute}/v1/1/clients`,
          headers: {
            Authorization: login.data.token
          }
        });
        done();
      } catch (error) {
        expect(error.response.data).toBe('Unauthorized');
        expect(error.response.status).toBe(401);
        done();
      }
    });
  });

  
});