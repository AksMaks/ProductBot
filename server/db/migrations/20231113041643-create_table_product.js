'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      CREATE TABLE product ( 
        id SERIAL PRIMARY KEY,
        name VARCHAR ( 100 ) NOT NULL,
        category_id INTEGER  NOT NULL,
        on_menu BOOLEAN NOT NULL DEFAULT false,
        active BOOLEAN NOT NULL DEFAULT true,
        CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES category(id)
      );
      `
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      DROP TABLE product;
      `
    );
  }
};
