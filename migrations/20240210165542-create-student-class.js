'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const studentClassAttributes = require('../bootstraps/studentClass')(Sequelize);

    await queryInterface.createTable('StudentClasses', studentClassAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StudentClasses');
  }
};