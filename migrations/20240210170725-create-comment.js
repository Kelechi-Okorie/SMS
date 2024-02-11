'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const commentAttributes = require('../bootstraps/comment')(Sequelize);
    await queryInterface.createTable('Comments', commentAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};