'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          'users',
          'location_latitude',
          {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: {
              isFloat: true
            }
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          'users',
          'location_longitude',
          {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: {
              isFloat: true
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
        queryInterface.changeColumn(
          'users',
          'location_latitude',
          {
            type: Sequelize.DOUBLE,
            allowNull: false
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          'users',
          'location_longitude',
          {
            type: Sequelize.DOUBLE,
            allowNull: false
          },
          { transaction: t }
        )
      ])
    })
  }
};
