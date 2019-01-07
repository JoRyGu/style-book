'use strict';
module.exports = (sequelize, DataTypes) => {
  var Stylist = sequelize.define('Stylist', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Stylist.associate = function(models) {
    // associations can be defined here
  };
  return Stylist;
};