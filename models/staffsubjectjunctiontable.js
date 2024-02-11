'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const staffSubjectJunctionTableAttributes = require('../bootstraps/staffSubjectJunctionTable')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class StaffSubjectJunctionTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StaffSubjectJunctionTable.init(staffSubjectJunctionTableAttributes, {
    sequelize,
    modelName: 'StaffSubjectJunctionTable',
  });
  return StaffSubjectJunctionTable;
};