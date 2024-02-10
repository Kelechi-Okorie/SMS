'use strict';
const {
  Model
} = require('sequelize');
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
  SchoolSetting.init({
    settings: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SchoolSetting',
  });
  return SchoolSetting;
};