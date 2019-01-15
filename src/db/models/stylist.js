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
      allowNull: false,
      validate: {
        isEmail: { msg: 'must be a valid email' }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Stylist.associate = function(models) {
    // associations can be defined here
    Stylist.hasMany(models.Client, {
      foreignKey: 'stylistId'
    });
  };
  return Stylist;
};