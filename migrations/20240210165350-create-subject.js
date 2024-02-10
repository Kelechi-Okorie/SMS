'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const subjectAttributes = require('../bootstraps/subject')(Sequelize);

    await queryInterface.createTable('Subjects', subjectAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Subjects');
  }
};