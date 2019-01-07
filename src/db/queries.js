const Stylist = require('./models').Stylist;

module.exports = {
  Stylist: {
    async getByEmail(email) {
      return await Stylist.findOne({
        where: {
          email
        }
      });
    }
  }
}