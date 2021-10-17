'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.User, {
        as: 'image_owner',
        foreignKey: 'user_id'
      })
      Image.belongsTo(models.Listing, {
        as: 'image_listing',
        foreignKey: 'listing_id'
      })
    }
  };
  Image.init({
    file_name: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
    listing_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'listings',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
  }, {
    sequelize,
    modelName: 'Image',
    tableName: 'images',
  });
  return Image;
};