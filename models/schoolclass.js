'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const schoolClassAttributes = require('../bootstraps/schoolClass')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class SchoolClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.SchoolType);

      this.hasMany(models.StudentClass);
      this.hasMany(models.StudentResult);

      this.hasMany(models.Fee);

    }
  }
  SchoolClass.init(schoolClassAttributes, {
    sequelize,
    modelName: 'SchoolClass',
    timestamps: false
  });
  return SchoolClass;
};