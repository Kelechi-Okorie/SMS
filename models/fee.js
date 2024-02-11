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
    }
  }
  Fee.init(feeAttributes, {
    sequelize,
    modelName: 'Fee',
  });
  return Fee;
};