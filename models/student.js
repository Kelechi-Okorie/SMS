'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const studentAttributes =  require('../bootstraps/student')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);

      this.belongsTo(models.School);

      this.hasMany(models.StudentResult);

      this.belongsToMany(models.StudentClass, { through: models.StudentClassJunctionTable });

      this.belongsTo(models.SchoolStaff, {foreignKey:'disabledBy', as: 'disablingStaff'});

      this.belongsTo(models.Session, { foreignKey: 'graduationSessionId', as: 'graduationSession'});

      this.hasMany(models.FeePayment);

      this.hasMany(models.Attendance);

      this.hasMany(models.Comment);
    }
  }
  Student.init(studentAttributes, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};