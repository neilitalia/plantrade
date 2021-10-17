'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          'images',
          'user_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          'images',
          'listing_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'listings',
              key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          'listings',
          'user_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          'carts',
          'user_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
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
        queryInterface.changeColumn(
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
        ),
        queryInterface.changeColumn(
          'listings',
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
        queryInterface.changeColumn(
          'carts',
          'user_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            }
          },
          { transaction: t }
        )
      ])
    })
  }
};
