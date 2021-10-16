'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('carts_listings', ['listing_id','cart_id'],{
      name: 'listing_in_cart',
      unique: true
     });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('carts_listings', '`listing_in_cart`');
  }
};
