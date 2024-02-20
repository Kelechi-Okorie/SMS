'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const gradeAttributes = require('../bootstraps/grade')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.School);
      this.hasMany(models.SubjectLineItem);
    }
  }
  Grade.init(gradeAttributes, {
    sequelize,
    modelName: 'Grade',
  });
  return Grade;
};