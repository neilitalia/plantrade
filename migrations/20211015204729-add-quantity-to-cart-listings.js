'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('carts_listings', 'quantity',
      {
        type: Sequelize.INTEGER
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('carts_listings', 'quantity');
  }
};
