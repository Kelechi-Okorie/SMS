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
            references: { model: 'Schools', key: 'id'}
        },
        name: { 
            type: DataTypes.STRING(191),
        },
        code: {
            type: DataTypes.STRING(191)
        },
        description: {
            type: DataTypes.STRING
        },
        isOneTimePayment: {
            type: DataTypes.BOOLEAN
        },
        isPerTerm: {
            type: DataTypes.BOOLEAN
        },
        isPerSession: {
            type: DataTypes.BOOLEAN
        },
        isSessionSpecific: {
            type: DataTypes.BOOLEAN
        },
        sessionId: {
            type: DataTypes.INTEGER,
            references: { model: 'Sessions', key: 'id'}
        },
        isDepartmentSpecific: {
            type: DataTypes.BOOLEAN
        },
        departmentId: {
            type: DataTypes.INTEGER
        },
        isSchoolClassSpecific: {
            type: DataTypes.BOOLEAN
        },
        schoolClassId: {
            type: DataTypes.INTEGER,
            references: { model: 'SchoolClasses', key: 'id'}
        },
        isTermSpecific: {
            type: DataTypes.BOOLEAN
        },
        termId: {
            type: DataTypes.INTEGER,
            references: { model: 'Terms', key: 'id'}
        },
        amount: {
            type: DataTypes.INTEGER.UNSIGNED
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