'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const staffSubjectJunctionTableAttributes = require('../bootstraps/staffSubjectJunctionTable')(Sequelize);

    await queryInterface.createTable('StaffSubjectJunctionTables', staffSubjectJunctionTableAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StaffSubjectJunctionTables');
  }
};