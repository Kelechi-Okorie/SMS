'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const schoolSettingAttributes = require('../bootstraps/schoolSettings')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class SchoolSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SchoolSetting.init(schoolSettingAttributes, {
    sequelize,
    modelName: 'SchoolSetting',
  });
  return SchoolSetting;
};