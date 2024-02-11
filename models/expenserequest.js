'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const expenseRequestAttributes = require('../bootstraps/expenseRequest')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class ExpenseRequeat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExpenseRequeat.init(expenseRequestAttributes, {
    sequelize,
    modelName: 'ExpenseRequeat',
  });
  return ExpenseRequeat;
};