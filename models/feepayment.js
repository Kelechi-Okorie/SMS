'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeePayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FeePayment.init({
    schoolId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FeePayment',
  });
  return FeePayment;
};