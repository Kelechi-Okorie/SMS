'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const studentClassAttributes = require('../bootstraps/studentClass')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class StudentClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.School);

      this.belongsTo(models.Session);

      this.belongsTo(models.SchoolClass);

      this.belongsTo(models.Demarcation);

      this.belongsToMany(models.Student, { through: models.StudentClassJunctionTable});

      this.hasMany(models.StudentResult);

      this.belongsTo(models.SchoolStaff, {foreignKey: 'managerId', as: 'manager'});

      this.hasMany(models.FeePayment);

      this.hasMany(models.Attendance);
    }
  }
  StudentClass.init(studentClassAttributes, {
    sequelize,
    modelName: 'StudentClass',
    timestamps: false
  });
  return StudentClass;
};