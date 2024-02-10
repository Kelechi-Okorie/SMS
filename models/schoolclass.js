'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SchoolClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SchoolClass.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SchoolClass',
  });
  return SchoolClass;
};