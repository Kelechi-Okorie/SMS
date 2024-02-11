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
        // allowNull: false,
        references: { model: 'Schools', key: 'id' }
      },
      feeId: {
        type: DataTypes.INTEGER,
        references: { model: 'Fees', key: 'id' }
      },
      paymentGateway: {
        type: DataTypes.STRING(191)
      },
      reference: {
        type: DataTypes.STRING(191),
        unique: true
      },
      studentId: {
        type: DataTypes.INTEGER,
        references: { model: 'Students', key: 'id' }
      },
      studentClassId: {
        type: DataTypes.INTEGER
      },
      sessionId: {
        type: DataTypes.INTEGER,
        references: { model: 'Sessions', key: 'id' }
      },
      termId: {
        type: DataTypes.INTEGER,
        references: { model: 'Terms', key: 'id' }
      },
      feeAmount: {
        type: DataTypes.INTEGER
      },
      amountPaid: {
        type: DataTypes.INTEGER
      },
      description: {
        type: DataTypes.STRING
      },
      paymentDate: {
        type: DataTypes.DATE
      },
      processedBy: {
        type: DataTypes.INTEGER,
        references: { model: 'SchoolStaffs', key: 'id'}
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        set(value) {
          this.setDataValue('createdAt', new Date());
        }
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        set(value) {
          this.setDataValue('updatedAt', new Date());
        }
      }
    }
  }