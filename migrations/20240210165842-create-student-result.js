'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const studentResultAttributes = require('../bootstraps/studentResult')(Sequelize);

    await queryInterface.createTable('StudentResults', studentResultAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StudentResults');
  }
};