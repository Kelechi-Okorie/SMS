module.exports = (Sequelize) => {
    const { DataTypes } = Sequelize;

    return {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.INTEGER,
            references: { model: 'users', key: 'id' }
        },
        schoolId: {
            type: DataTypes.INTEGER,
            references: { model: 'schools', key: 'id' }
        },
        regNumber: {
            type: DataTypes.STRING(191),
            unique: true
        },
        admissionDate: {
            type: DataTypes.DATE
        },
        hasGraduated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        graduationSessionId: {
            type: DataTypes.INTEGER,
            references: { model: 'sessions', on: 'id' }
        },
        isDisabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        disablingReason: {
            type: DataTypes.TEXT
        },
        disabledBy: {
            type: DataTypes.INTEGER,
            references: { model: 'schoolstaffs', key: 'id' }
        },
        disableDate: {
            type: DataTypes.DATE
        }

    }
}