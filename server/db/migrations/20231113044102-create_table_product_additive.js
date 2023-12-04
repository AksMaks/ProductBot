'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      CREATE TABLE product_additive (
        id SERIAL PRIMARY KEY,
        name VARCHAR ( 100 ) NOT NULL,
        variant_id INTEGER  NOT NULL,
        active BOOLEAN NOT NULL DEFAULT true,
        CONSTRAINT fk_variant FOREIGN KEY(variant_id) REFERENCES product_variant(id)
      );
      `
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      DROP TABLE product_additive;
      `
    );
  }
};
