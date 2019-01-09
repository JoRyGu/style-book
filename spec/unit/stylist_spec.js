const { Stylist } = require('../../src/db/queries');
const sequelize = require('../../src/db/models/index').sequelize;
const hash = require('../../helpers/hashPassword');
const stylist = require('../../src/db/models').Stylist;

describe('Stylist model queries', () => {
  beforeEach(async (done) => {
    await sequelize.sync({ force: true });
    const password = await hash('password');

    await stylist.create({
      id: 1,
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

      expect(testStylist.firstName).toBe('Jane');
      done();
    })
  })
})