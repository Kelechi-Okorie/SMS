'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const schoolStaffAttributes = require('../bootstraps/schoolSettings')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class SchoolStaff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SchoolStaff.init(schoolStaffAttributes, {
    sequelize,
    modelName: 'SchoolStaff',
  });
  return SchoolStaff;
};