'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const demarcationAttributes = require('../bootstraps/demarcation')(Sequelize);

    await queryInterface.createTable('Demarcations', demarcationAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Demarcations');
  }
};