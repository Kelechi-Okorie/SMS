'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const schoolAttributes = require('../bootstraps/school')(Sequelize);

    await queryInterface.createTable('Schools', schoolAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Schools');
  }
};