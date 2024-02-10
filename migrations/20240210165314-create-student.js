'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const studentAttributes = require('../bootstraps/student')(Sequelize);
    
    await queryInterface.createTable('Students', studentAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  }
};