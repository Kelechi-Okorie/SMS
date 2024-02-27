'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const demarcationAttributes = require('../bootstraps/demarcation')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class Demarcation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.StudentClass);
      // this.hasMany(models.StudentResult);
    }
  }
  Demarcation.init(demarcationAttributes, {
    sequelize,
    modelName: 'Demarcation',
    timestamps: false
  });
  return Demarcation;
};