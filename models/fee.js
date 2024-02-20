'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const feeAttributes = require('../bootstraps/fee')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class Fee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.School);
      this.belongsTo(models.Session);
      this.belongsTo(models.SchoolClass);
      this.belongsTo(models.Term);
      this.hasMany(models.FeePayment);
    }
  }
  Fee.init(feeAttributes, {
    sequelize,
    modelName: 'Fee',
  });
  return Fee;
};