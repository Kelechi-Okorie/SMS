'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const studentClassJunctionTableAttributes = require('../bootstraps/studentClassJunctionTable')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class StudentClassJunctionTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudentClassJunctionTable.init(studentClassJunctionTableAttributes, {
    sequelize,
    modelName: 'StudentClassJunctionTable',
  });
  return StudentClassJunctionTable;
};