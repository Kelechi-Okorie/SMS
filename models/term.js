'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const termAttributes = require('../bootstraps/term')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class Term extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Term.init(termAttributes, {
    sequelize,
    modelName: 'Term',
  });
  return Term;
};