'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      CREATE TABLE payment (
        id serial PRIMARY KEY,
        name VARCHAR ( 255 ) UNIQUE NOT NULL
      );
      `
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      DROP TABLE payment;
      `
    );
  }
};
