'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const termAttributes = require('../bootstraps/term')(Sequelize);

    await queryInterface.createTable('Terms', termAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Terms');
  }
};