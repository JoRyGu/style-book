const { Client } = require('../../src/db/queries');
const client = require('../../src/db/models').Client;
const stylist = require('../../src/db/models').Stylist;
const sequelize = require('../../src/db/models/index').sequelize;

describe('Client model queries', () => {
  beforeEach(async done => {
    await sequelize.sync({ force: true });

    await stylist.create({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jsmith@fake.net',
      password: 'password'
    });

    await client.create({
      firstName: 'John',
      lastName: 'Smith',
      phoneNumber: '867-5309',
      stylistId: 1
    });

    done();
  })

  describe('Client#getAllForStylist()', () => {
    it('Should return an array of clients that match the given stylistId', async (done) => {
      const clientList = await Client.getAllForStylist(1);

      expect(clientList[0].firstName).toBe('John');
      expect(clientList[0].lastName).toBe('Smith');
      expect(clientList[0].phoneNumber).toBe('867-5309');
      expect(clientList[0].stylistId).toBe(1);
      done();
    });

    it('Should throw an error when the stylist queried does not exist.', async (done) => {
      try {
        const clientList = await Client.getAllForStylist(2);
      } catch (error) {
        expect(error).not.toBeNull();
        expect(error).toEqual(new Error('No clients for that ID.'));
        done();
      }
    });
  });

  describe('Client#create()', () => {
    it('Should create a new client in the database.', async (done) => {
      try {
        const newClient = await Client.create({
          firstName: 'Darth',
          lastName: 'Vader',
          phoneNumber: '999-9999',
          stylistId: 1
        });

        expect(newClient).not.toBeNull();
        expect(newClient.firstName).toBe('Darth');
        expect(newClient.lastName).toBe('Vader');
        expect(newClient.phoneNumber).toBe('999-9999');

        done();
      } catch (error) {
        expect(error).toBeNull();

        done();
      }
    });

    it('Should initialize client\'s noShow status to false if not specified in query.', async (done) => {
      try {
        const newClient = await Client.create({
          firstName: 'Darth',
          lastName: 'Vader',
          phoneNumber: '999-9999',
          stylistId: 1
        });

        expect(newClient.noShow).toBe(false);
        done();
      } catch (error) {
        expect(error).toBeNull();
        done();
      }
    });

    it('Should throw an error if firstName, lastName, phoneNumber, or stylistId are not provided.', async (done) => {
      try {
        const newClient = await Client.create({
          email: 'fake@fake.net'
        });
      } catch(error) {
        expect(error.errors[0].message).toBe('Client.firstName cannot be null');
        expect(error.errors[1].message).toBe('Client.lastName cannot be null');
        expect(error.errors[2].message).toBe('Client.phoneNumber cannot be null');
        expect(error.errors[3].message).toBe('Client.stylistId cannot be null');
        done();
      }
    });

    it('Should throw an error if the client\'s phone number matches one already stored in the database.', async (done) => {
      try {
        const newClient = await Client.create({
          firstName: 'John',
          lastName: 'Smith',
          phoneNumber: '867-5309',
          stylistId: 1
        })
      } catch(error) {
        expect(error.errors[0].message).toBe('phoneNumber must be unique');
        done();
      }
    });
  });
});