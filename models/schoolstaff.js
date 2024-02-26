'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const schoolStaffAttributes = require('../bootstraps/schoolStaff')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class SchoolStaff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId' });

      this.hasMany(models.SchoolStaff, { foreignKey: 'disabledBy', as: 'disabledStaff' });
      this.belongsTo(models.SchoolStaff, { foreignKey: 'disabledBy', as: 'disablingStaff' });

      this.belongsTo(models.School, { foreignKey: 'schoolId', as: 'School' });

      this.belongsToMany(models.Subject, { through: models.StaffSubjectJunctionTable });

      this.hasMany(models.SubjectLineItem);

      this.hasMany(models.StudentClass, { foreignKey: 'managerId', as: 'managedClass' });

      this.hasMany(models.Student, { foreignKey: 'disabledBy', as: 'disabledStudent' });

      this.hasMany(models.FeePayment, { foreignKey: 'processedBy' });

      this.hasMany(models.ExpenseRequest, { foreignKey: 'requestedBy', as: 'requestingStaff'});
      this.hasMany(models.ExpenseRequest, { foreignKey: 'approvedBy', as: 'approvingStaff'});
      this.hasMany(models.ExpenseRequest, { foreignKey: 'rejectedBy', as: 'rejectingStaff'});
      
      this.hasMany(models.Attendance, { foreignKey: 'takenBy'});


      this.hasMany(models.Comment);
    }
  }
  SchoolStaff.init(schoolStaffAttributes, {
    sequelize,
    modelName: 'SchoolStaff',
    timestamps: false
  });
  return SchoolStaff;
};