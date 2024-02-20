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
      this.belongsTo(models.School);
      this.belongsTo(models.Session);
      this.belongsTo(models.Term);
      this.belongsTo(models.StudentClass);
      this.belongsTo(models.Student);
      this.belongsTo(models.SchoolStaff, { foreignKey: 'takenBy'});
    }
  }
  Attendance.init(attendanceAttributes, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};