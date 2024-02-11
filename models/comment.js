'use strict';
const {
  Model, Sequelize
} = require('sequelize');

const commentAttributes = require('../bootstraps/comment')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init(commentAttributes, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};