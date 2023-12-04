'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      CREATE TABLE order_list (
        id serial PRIMARY KEY,
        order_id INTEGER NOT NULL,
        variant_id INTEGER  NOT NULL,
        CONSTRAINT fk_order FOREIGN KEY(order_id) REFERENCES orders(id),
        CONSTRAINT fk_variant FOREIGN KEY(variant_id) REFERENCES product_variant(id)
      );
      `
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      DROP TABLE order_list;
      `
    );
  }
};
