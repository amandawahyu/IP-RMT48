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
    myMangaId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    pictUrl: DataTypes.STRING,
    score: DataTypes.FLOAT,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};