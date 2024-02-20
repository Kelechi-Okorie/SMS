'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const portalAdminAttributes = require('../bootstraps/portalAdmin')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class PortalAdmin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
    }
  }
  PortalAdmin.init(portalAdminAttributes, {
    sequelize,
    modelName: 'PortalAdmin',
  });
  return PortalAdmin;
};