'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      CREATE TABLE category (
        id serial PRIMARY KEY,
        name VARCHAR ( 100 ) UNIQUE NOT NULL, 
        active BOOLEAN NOT NULL DEFAULT true
      );
      `
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      DROP TABLE category;
      `
    );
  }
};
