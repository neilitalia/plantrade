'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    static associate(models) {
      Listing.belongsTo(models.User, {
        as: 'listing_owner',
        foreignKey: 'user_id'
      })
      Listing.belongsToMany(models.Cart, { through: models.CartListing, as: 'cart_listing'})
      Listing.hasMany(models.Image, {
        as: 'image_listing',
        foreignKey: 'listing_id'
      })
    }
  };
  Listing.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.REAL,
      allowNull: false
    },
    plant: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Listing',
    tableName: 'listings'
  });
  return Listing;
};