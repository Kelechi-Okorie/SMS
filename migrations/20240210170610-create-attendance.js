'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const attendanceAttributes = require('../bootstraps/attendance')(Sequelize);
    await queryInterface.createTable('Attendances', attendanceAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Attendances');
  }
};