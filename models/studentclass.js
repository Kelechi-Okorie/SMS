'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const studentClassAttributes = require('../bootstraps/studentClass')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class StudentClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudentClass.init(studentClassAttributes, {
    sequelize,
    modelName: 'StudentClass',
  });
  return StudentClass;
};