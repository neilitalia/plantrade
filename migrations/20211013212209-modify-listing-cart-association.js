'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('carts', 'listing_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('carts', 'listing_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'listings',
          key: 'id'
        }
      }
    );
  }
};
