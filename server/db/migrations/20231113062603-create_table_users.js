'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      CREATE TABLE users (
        id serial PRIMARY KEY,
        login VARCHAR ( 255 ) UNIQUE NOT NULL,
        password VARCHAR ( 255 ) UNIQUE NOT NULL
      );
      `
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      DROP TABLE users;
      `
    );
  }
};
