'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const subjectLineItemAttributes = require('../bootstraps/subjectLineItem')(Sequelize);

    await queryInterface.createTable('SubjectLineItems', subjectLineItemAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SubjectLineItems');
  }
};