'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const subjectLineItemAttributes = require('../bootstraps/subjectLineItem')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class SubjectLineItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.StudentResult);
      this.belongsTo(models.Subject);
      this.belongsTo(models.SchoolStaff);
      this.hasMany(models.AssessmentLineItem)
      this.belongsTo(models.Grade);
    }
  }
  SubjectLineItem.init(subjectLineItemAttributes, {
    sequelize,
    modelName: 'SubjectLineItem',
  });
  return SubjectLineItem;
};