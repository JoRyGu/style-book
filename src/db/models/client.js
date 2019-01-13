'use strict';
module.exports = (sequelize, DataTypes) => {
  var Client = sequelize.define('Client', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastVisit: {
      type: DataTypes.DATE,
      allowNull: true
    },
    noShow: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    stylistId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Client.associate = function(models) {
    Client.belongsTo(models.Stylist, {
      foreignKey: 'stylistId',
      onDelete: 'CASCADE'
    });
  };
  return Client;
};
