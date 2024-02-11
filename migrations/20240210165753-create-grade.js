'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const gradeAttributes = require('../bootstraps/grade')(Sequelize);
    await queryInterface.createTable('Grades', gradeAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Grades');
  }
};