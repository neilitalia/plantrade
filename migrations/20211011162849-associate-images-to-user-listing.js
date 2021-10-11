'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'images',
          'user_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            }
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'images',
          'listing_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'listings',
              key: 'id'
            }
          },
          { transaction: t }
        )
      ])
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn(
          'images',
          'user_id',
          { transaction: t }
        ),
        queryInterface.removeColumn(
          'images',
          'listing_id',
          { transaction: t }
        )
      ])
    })
  }
};
