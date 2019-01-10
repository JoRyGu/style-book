const Stylist = require('./models').Stylist;
const hash = require('../../helpers/hashPassword');

module.exports = {
  Stylist: {
    async getByEmail(email) {
      try {
        return await Stylist.findOne({
          where: {
            email
          }
        });
      } catch (error) {
        throw new Error(error);
      }
    },

    async create(stylist) {
      try {
        const password = await hash(stylist.password);
        const newStylist = await Stylist.create({
          firstName: stylist.firstName,
          lastName: stylist.lastName,
          email: stylist.email,
          password
        });
  
        return newStylist;
      } catch (error) {
        throw error;
      }
      
    }
  }
}