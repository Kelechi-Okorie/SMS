'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const studentResultAttributes = require('../bootstraps/studentResult')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class StudentResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudentResult.init(studentResultAttributes, {
    sequelize,
    modelName: 'StudentResult',
  });
  return StudentResult;
};