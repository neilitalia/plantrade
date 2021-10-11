'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Listing, {
        as: 'listing_owner',
        foreignKey: 'user_id'
      })
      User.hasMany(models.Cart, {
        as: 'cart_owner',
        foreignKey: 'user_id'
      })
      User.hasMany(models.Image, {
        as: 'image_owner',
        foreignKey: 'user_id'
      })
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password_digest: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location_latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    location_longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};