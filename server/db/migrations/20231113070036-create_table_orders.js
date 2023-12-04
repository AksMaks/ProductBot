'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      CREATE TABLE orders (
        id serial PRIMARY KEY,
        address VARCHAR ( 255 ) NOT NULL,
        client_id INTEGER NOT NULL,
        date DATE NOT NULL,
        approved BOOLEAN NOT NULL DEFAULT false,
        CONSTRAINT fk_client FOREIGN KEY(client_id) REFERENCES client(id)
      );
      `
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      DROP TABLE orders;
      `
    );
  }
};
