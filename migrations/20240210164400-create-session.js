'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const sessionAttributes = require('../bootstraps/session')(Sequelize);

    await queryInterface.createTable('Sessions', sessionAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sessions');
  }
};