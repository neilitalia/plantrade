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
      references: {
        model: 'cart',
        key: 'cart_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
    listing_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'listings',
        key: 'listing_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
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