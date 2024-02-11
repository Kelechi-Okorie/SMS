'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const assessmentLineItemAttribute = require('../bootstraps/assessmentLineItem')(Sequelize);

    await queryInterface.createTable('AssessmentLineItems', assessmentLineItemAttribute);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AssessmentLineItems');
  }
};