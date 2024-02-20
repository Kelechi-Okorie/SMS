'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const expenseRequestAttributes = require('../bootstraps/expenseRequest')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class ExpenseRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.School);

      this.belongsTo(models.SchoolStaff, { foreignKey: 'requestedBy', as: 'requestingStaff'});
      this.belongsTo(models.SchoolStaff, { foreignKey: 'approvedBy', as: 'approvingStaff'});
      this.belongsTo(models.SchoolStaff, { foreignKey: 'rejectedBy', as: 'rejectingStaff'});
    }
  }
  ExpenseRequest.init(expenseRequestAttributes, {
    sequelize,
    modelName: 'ExpenseRequest',
  });
  return ExpenseRequest;
};