'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const feeAttributes = require('../bootstraps/fee')(Sequelize);

    await queryInterface.createTable('Fees', feeAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Fees');
  }
};