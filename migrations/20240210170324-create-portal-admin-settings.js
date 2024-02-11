'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const portalAdminSettingAttributes = require('../bootstraps/portalAdminSetting')(Sequelize);

    await queryInterface.createTable('PortalAdminSettings', portalAdminSettingAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PortalAdminSettings');
  }
};