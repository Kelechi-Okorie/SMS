'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const assessmentAttributes = require('../bootstraps/assessment')(Sequelize);

    await queryInterface.createTable('Assessments', assessmentAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Assessments');
  }
};