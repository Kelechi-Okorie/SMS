module.exports = (Sequelize) => {
    const { DataTypes } = Sequelize;
  
    return {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      schoolId: {
        type: DataTypes.INTEGER,
        references: { model: 'Schools', key: 'id' }
      },
      settings: {
        type: DataTypes.TEXT,
        get: function () {
          return JSON.parse(this.getDataValue("settings"));
        },
        set: function (value) {
          return this.setDataValue("settings", JSON.stringify(value));
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        set(value) {
          this.setDataValue('createdAt', new Date());
        }
      },
      updatedAt: {
        type: DataTypes.DATE,
        set(value) {
          this.setDataValue('createdAt', new Date());
        }
      }
    }
  }