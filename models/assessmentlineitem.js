'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const assessmentLineItemAttributes = require('../bootstraps/assessmentLineItem')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class AssessmentLineItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AssessmentLineItem.init(assessmentLineItemAttributes, {
    sequelize,
    modelName: 'AssessmentLineItem',
  });
  return AssessmentLineItem;
};