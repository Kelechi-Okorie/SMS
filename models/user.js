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
  User.init({
    ...userAttributes,

    // Virtual fields
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.middleName} ${this.lastName}`
      }
    },
    type: {
      type: DataTypes.VIRTUAL,
      get() {

        if (this.isPortalAdmin) {
          return 'portalAdmin';
        } else if (this.isSchoolStaff) {
          return 'schoolStaff';
        } else if (this.isStudent) {
          return 'student';
        } else if (this.isParent) {
          return 'parent';
        } else {
          return 'unknown'
        }
      }
    }

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};