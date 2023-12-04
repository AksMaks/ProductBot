'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      CREATE TABLE client (
        id serial PRIMARY KEY,
        first_name VARCHAR ( 255 ) UNIQUE NOT NULL,
        last_name VARCHAR ( 255 ) UNIQUE NOT NULL,
        chat_id INTEGER UNIQUE NOT NULL
      );
      `
    ); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      DROP TABLE client;
      `
    );
  }
};
