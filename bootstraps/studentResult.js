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
        references: { model: 'schools', key: 'id' }
      },
      sessionId: {
        type: DataTypes.INTEGER,
        references: { model: 'sessions', key: 'id' }
      },
      termId: {
        type: DataTypes.INTEGER,
        references: { model: 'terms', key: 'id' }
      },
      schoolClassId: {
        type: DataTypes.INTEGER,
        references: { model: 'schoolclasses', key: 'id' }
      },
      classDemarcationId: {
        type: DataTypes.INTEGER,
        references: { model: 'classdemarcations', key: 'id' }
      },
      studentClassId: {
        type: DataTypes.INTEGER,
        references: { model: 'studentclasses', key: 'id' }
      },
      studentId: {
        type: DataTypes.INTEGER,
        references: { model: 'students', key: 'id' }
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