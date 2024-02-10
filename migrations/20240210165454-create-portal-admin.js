'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const portalAdminAttributes = require('../bootstraps/portalAdmin')(Sequelize);

    await queryInterface.createTable('PortalAdmins', portalAdminAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PortalAdmins');
  }
};