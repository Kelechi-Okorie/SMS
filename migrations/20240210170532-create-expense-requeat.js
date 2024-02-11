'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const expenseRequestAttributes = require('../bootstraps/expenseRequest')(Sequelize);

    await queryInterface.createTable('ExpenseRequeats', expenseRequestAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ExpenseRequeats');
  }
};