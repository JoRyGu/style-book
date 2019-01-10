const { Stylist } = require('../../src/db/queries');
const sequelize = require('../../src/db/models/index').sequelize;
const hash = require('../../helpers/hashPassword');
const stylist = require('../../src/db/models').Stylist;

describe('Stylist model queries', () => {
  beforeEach(async (done) => {
    await sequelize.sync({ force: true });
    const password = await hash('password');

    await stylist.create({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jsmith@fake.net',
      password
    });
    done();
  })

  describe('Stylist#getByEmail()', () => {
    it('Should return a valid Stylist instance from sequelize', async (done) => {
      const testStylist = await Stylist.getByEmail('jsmith@fake.net');

      expect(testStylist).not.toBe(undefined);
      expect(testStylist.firstName).toBe('Jane');
      expect(testStylist.lastName).toBe('Smith');
      done();
    });

    it('Should return null if stylist is not found', async (done) => {
      const testStylist = await Stylist.getByEmail('jimmy');
      expect(testStylist).toBeNull();
      done();
    })
  });

  describe('Stylist#create()', () => {
    it('Should create a new stylist in the database', async (done) => {
      await Stylist.create({
        firstName: 'Helga',
        lastName: 'Olstofferson',
        email: 'helga@fake.net',
        password: '12345678'
      });

      const createdStylist = await Stylist.getByEmail('helga@fake.net');

      expect(createdStylist).not.toBeNull();
      expect(createdStylist.firstName).toBe('Helga');
      expect(createdStylist.createdAt).not.toBeNull();
      done();
    });

    it('Should return newly created stylist', async (done) => {
      const createdStylist = await Stylist.create({
        firstName: 'Darth',
        lastName: 'Vader',
        email: 'vader@deathstar.gov',
        password: 'rebelscum'
      });

      expect(createdStylist).not.toBeNull();
      expect(createdStylist.firstName).toBe('Darth');
      expect(createdStylist.createdAt).not.toBeNull();
      done();
    });

    it('Should throw an error if input email is not a valid email', async (done) => {
      try {
        await Stylist.create({
          firstName: 'Darth',
          lastName: 'Maul',
          email: 'whatisanemail',
          password: 'thisisapassword'
        })
      } catch(error) {
        expect(error.errors[0].message).toBe('must be a valid email');
        done();
      }
      
      done();
    });

    it('Should throw an error if input email is a duplicate', async (done) => {
      try {
        await Stylist.create({
          firstName: 'Jane',
          lastName: 'Smith 2.0',
          email: 'jsmith@fake.net',
          password: 'password'
        })
      } catch(error) {
        expect(error.errors[0].message).toBe('email must be unique');
        done();
      }
    })
  })
})