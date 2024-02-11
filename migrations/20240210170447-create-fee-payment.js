'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const feePaymentAttributes = require('../bootstraps/feePayment')(Sequelize);

    await queryInterface.createTable('FeePayments', feePaymentAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FeePayments');
  }
};