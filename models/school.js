'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const schoolAttributes = require('../bootstraps/school')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class School extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.SchoolType);

      this.hasMany(models.SchoolStaff, { foreignKey: 'schoolId', as: 'staff' });
      this.hasMany(models.Student);

      this.hasMany(models.User, { foreignKey: 'schoolId', as: 'user' })

      this.hasMany(models.Session);

      this.hasMany(models.Subject);

      this.hasMany(models.Assessment);

      this.hasMany(models.Grade);

      this.hasMany(models.StudentClass);
      this.hasMany(models.StudentResult);

      this.hasOne(models.SchoolSetting);


      this.hasMany(models.Fee);
      this.hasMany(models.FeePayment);

      this.hasMany(models.ExpenseRequest);

      this.hasMany(models.Attendance);

      this.hasMany(models.Comment);
    }
  }
  School.init(schoolAttributes, {
    sequelize,
    modelName: 'School',
  });
  return School;
};