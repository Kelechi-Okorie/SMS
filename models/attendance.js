'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const attendanceAttributes = require('../bootstraps/attendance')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Attendance.init(attendanceAttributes, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};