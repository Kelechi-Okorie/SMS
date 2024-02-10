'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const SchoolSettingAttributes = require('../bootstraps/schoolSettings')(Sequelize);

    await queryInterface.createTable('SchoolSettings', SchoolSettingAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SchoolSettings');
  }
};