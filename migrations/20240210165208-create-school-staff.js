'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const schoolStaffAttributes = require('../bootstraps/schoolStaff')(Sequelize);

    await queryInterface.createTable('SchoolStaffs', schoolStaffAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SchoolStaffs');
  }
};