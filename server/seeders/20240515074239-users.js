'use strict';

const { hashPassword } = require('../helper/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require("../data/user.json").map(element => {
      element.createdAt = element.updatedAt = new Date();
      element.password = hashPassword(element.password)
      return element
    })
    await queryInterface.bulkInsert("Users", data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {
      restartIdentity: true,
      cascade: true,
      truncate: true,
    });
  },
};
