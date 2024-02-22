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
      this.hasOne(models.Student, { foreignKey: 'userId' });
      this.hasOne(models.SchoolStaff, { foreignKey: 'userId' });
      this.hasOne(models.PortalAdmin);

      this.hasOne(models.School, { foreignKey: 'ownerId' });

      this.belongsTo(models.School, { foreignKey: 'schoolId' });

      // this.hasMany(models.Payment);

      this.hasMany(models.User, {foreignKey: 'disablingUserId', as: 'disabledUser'} );
      this.belongsTo(models.User, {foreignKey: 'disablingUserId', as: 'disablingUser'});
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
    defaultScope: {
      attributes: {
        exclude: ['password']
      }
    },
    modelName: 'User',
  });
  return User;
};