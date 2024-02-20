'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const feePaymentAttributes = require('../bootstraps/feePayment')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class FeePayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.School);
      this.belongsTo(models.Student);
      this.belongsTo(models.Fee);
      this.belongsTo(models.StudentClass);
      this.belongsTo(models.Session);
      this.belongsTo(models.Term);

      this.belongsTo(models.SchoolStaff, { foreignKey: 'processedBy' });
    }
  }
  FeePayment.init(feePaymentAttributes, {
    sequelize,
    modelName: 'FeePayment',
  });
  return FeePayment;
};