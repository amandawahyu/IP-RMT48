'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User)
    }
  }
  Favorite.init({
    myManhwaAndMangaId: DataTypes.STRING,
    title: DataTypes.STRING,
    // coverArt: DataTypes.STRING,
    description: DataTypes.TEXT,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};