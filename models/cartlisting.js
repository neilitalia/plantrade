'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartListing extends Model {
  };
  CartListing.init({
    quantity:  {
      type: DataTypes.INTEGER,
    },
    cart_id:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'cart',
        key: 'id'
      },
    },
    listing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'listings',
        key: 'id'
      },
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ["listing_id", "cart_id"]
      }
    ],
    sequelize,
    modelName: 'CartListing',
    tableName: 'carts_listings'
  });
  return CartListing;
};