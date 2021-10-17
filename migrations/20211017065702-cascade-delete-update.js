'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          'carts',
          'user_id',
          {
            type: Sequelize.INTEGER,
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            references: {
              model: 'users',
              key: 'id'
            }
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          'images',
          'user_id',
          {
            type: Sequelize.INTEGER,
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
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
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
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
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            references: {
              model: 'users',
              key: 'id'
            }
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          'carts_listings',
          'cart_id',
          {
            type: Sequelize.INTEGER,
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            references: {
              model: 'carts',
              key: 'id'
            }
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          'carts_listings',
          'listing_id',
          {
            type: Sequelize.INTEGER,
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
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
        ),
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
              model: 'listings',
              key: 'id'
            }
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          'carts_listings',
          'cart_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'carts',
              key: 'id'
            }
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          'carts_listings',
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
};
