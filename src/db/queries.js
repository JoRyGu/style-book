const Stylist = require('./models').Stylist;
const hash = require('../../helpers/hashPassword');

module.exports = {
  Stylist: {
    async getByEmail(email) {
      return await Stylist.findOne({
        where: {
          email
        }
      });
    },

    async create(stylist) {
      const password = await hash(stylist.password);
      const newStylist = await Stylist.create({
        firstName: stylist.firstName,
        lastName: stylist.lastName,
        email: stylist.email,
        password
      });

      return newStylist;
    }
  }
}