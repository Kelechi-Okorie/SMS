'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const assessmentAttributes = require('../bootstraps/assessment')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class Assessment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.School);

      this.hasMany(models.AssessmentLineItem);

    }
  }
  Assessment.init(assessmentAttributes, {
    sequelize,
    modelName: 'Assessment',
    timestamps:false
  });
  return Assessment;
};
