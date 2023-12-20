'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      CREATE TABLE order_additive (
        id serial PRIMARY KEY,
        order_list_id INTEGER NOT NULL,
        additive_id INTEGER  NOT NULL,
        number INTEGER NOT NULL DEFAULT 1,
        CONSTRAINT fk_order_list FOREIGN KEY(order_list_id) REFERENCES order_list(id),
        CONSTRAINT fk_additive FOREIGN KEY(additive_id) REFERENCES product_additive(id)
      );
      `
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      DROP TABLE order_additive;
      `
    );
  }
};
