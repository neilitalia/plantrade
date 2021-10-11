'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          'users',
          'username',
          {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          'users',
          'email',
          {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
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
          'username',
          {
            type: Sequelize.STRING
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          'users',
          'email',
          {
            type: Sequelize.STRING
          },
          { transaction: t }
        )
      ])
    })
  }
};
