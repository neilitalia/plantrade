'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, {
        as: 'cart_owner',
        foreignKey: 'user_id'
      })
      Cart.belongsToMany(models.Listing, {
        through: models.CartListing,
        as: 'cart_listing',
        foreignKey: 'listing_id'
      })
    }
  };
  Cart.init({
    name: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts'
  });
  return Cart;
};