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
    }
  }
  Student.init(studentAttributes, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};