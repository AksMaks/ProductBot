'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const hashPassword = bcrypt.hashSync("123456", saltRounds);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      INSERT INTO users (login, password)
      VALUES ('admin', '${hashPassword}')
      `
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      DELETE FROM users WHERE login = 'admin';
      `
    );
  }
};
