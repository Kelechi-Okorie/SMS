'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const subjectAttributes = require('../bootstraps/subject')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.School);
      this.belongsToMany(models.SchoolStaff, {through: models.StaffSubjectJunctionTable})
      this.hasMany(models.SubjectLineItem);
    }
  }
  Subject.init(subjectAttributes, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};