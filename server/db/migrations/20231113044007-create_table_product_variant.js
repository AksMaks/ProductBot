'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      CREATE TABLE product_variant ( 
        id SERIAL PRIMARY KEY,
        name VARCHAR ( 100 ) NOT NULL,
        product_id INTEGER  NOT NULL,
        active BOOLEAN NOT NULL DEFAULT true,
        CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES product(id)
      );
      `
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      DROP TABLE product_variant;
      `
    );
  }
};
