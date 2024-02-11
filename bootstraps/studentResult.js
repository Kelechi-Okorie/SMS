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
      sessionId: {
        type: DataTypes.INTEGER,
        references: { model: 'Sessions', key: 'id' }
      },
      termId: {
        type: DataTypes.INTEGER,
        references: { model: 'Terms', key: 'id' }
      },
      schoolClassId: {
        type: DataTypes.INTEGER,
        references: { model: 'SchoolClasses', key: 'id' }
      },
      classDemarcationId: {
        type: DataTypes.INTEGER,
        references: { model: 'Demarcations', key: 'id' }
      },
      studentClassId: {
        type: DataTypes.INTEGER,
        references: { model: 'StudentClasses', key: 'id' }
      },
      studentId: {
        type: DataTypes.INTEGER,
        references: { model: 'Students', key: 'id' }
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isChecked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      score: {
        type: DataTypes.INTEGER
      },
      position: {
        type: DataTypes.INTEGER
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