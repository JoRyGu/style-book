const Stylist = require('./models').Stylist;
const Client = require('./models').Client;
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

    },

    async getById(id) {
      try {
        return await Stylist.findByPk(id);
      } catch (error) {
        throw error;
      }
    }
  },
  Client: {
    async getAllForStylist(stylistId) {
      try {
        const clientList = await Client.findAll({
          where: {
            stylistId
          }
        });

        if (clientList.length === 0) {
          throw new Error('No clients for that ID.');
        } else {
          return clientList;
        }
      } catch (error) {
        throw error;
      }
    },
    async create(client) {
      try {
        return await Client.create(client);
      } catch (error) {
        throw error;
      }
    },
    async getByPhoneNumber(phoneNumber) {
      try {
        return await Client.findOne({
          where: {
            phoneNumber
          }
        })
      } catch(error) {
        throw error;
      }
    }
  }
}