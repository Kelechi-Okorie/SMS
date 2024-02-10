'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const schoolClassAttributes = require('../bootstraps/schoolClass')(Sequelize);

    await queryInterface.createTable('SchoolClasses', schoolClassAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SchoolClasses');
  }
};