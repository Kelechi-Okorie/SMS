'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const sessionAttributes = require('../bootstraps/session')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Session.init(sessionAttributes, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};