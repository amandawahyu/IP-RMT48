'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Favorite)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Username Must Not Empty!"
        },
        notNull: {
          msg: "Username Must Not Empty!"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Input Must be Email Format!"
        },
        notEmpty: {
          msg: "Email Must Not Empty!"
        },
        notNull: {
          msg: "Email Must Not Empty!"
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, Infinity],
          msg: "Minimum Password Length is 5!"
        },
        notEmpty: {
          msg: "Password Must Not Empty!"
        },
        notNull: {
          msg: "Password Must Not Empty!"
        },
      },
    },
    imageUrl: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, option) {
        user.password = hashPassword(user.password)
      },
    },
  });
  return User;
};