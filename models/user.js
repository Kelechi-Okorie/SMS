'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');

const userAttributes = require('../bootstraps/user')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(...userAttributes, {
    sequelize,
    modelName: 'User',
  });
  return User;
};