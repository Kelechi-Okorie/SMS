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

      this.hasMany(models.SchoolStaff, { foreignKey: 'schoolId', as: 'Staff' });
      this.hasMany(models.Student);

      this.hasMany(models.User, { foreignKey: 'schoolId', as: 'user' });

      this.belongsTo(models.User, {foreignKey: 'ownerId', as: 'owner'});


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

    async getSchoolClasses() {
      const schoolType = await this.getSchoolType();
      const schoolClasses = await schoolType.getSchoolClasses();
      return schoolClasses;
    }

    async getCurrentSession() {
      const schoolSessions = await this.getSessions({
        where: {
          schoolId: this.id,
          isCurrentSession: true
        }
      });

      const currentSession = schoolSessions[0];

      return currentSession;
    }

    async getCurrentTerm() {
      const currentSession = await this.getCurrentSession();
      if (!currentSession) {
        return null;
      }

      const terms = await currentSession.getTerms({
        where: {
          sessionId: currentSession.id,
          isCurrentTerm: true
        }
      });
      const currentTerm = terms[0];
      return currentTerm;

    }

  }
  School.init(schoolAttributes, {
    sequelize,
    modelName: 'School',
  });
  return School;
};