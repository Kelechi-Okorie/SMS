'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const studentClassJunctionTableAttributes = require('../bootstraps/StudentClassJunctionTable')(Sequelize);
    await queryInterface.createTable('StudentClassJunctionTables', studentClassJunctionTableAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StudentClassJunctionTables');
  }
};