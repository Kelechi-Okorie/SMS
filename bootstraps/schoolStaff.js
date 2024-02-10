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
            references: { model: 'users', key: 'id'}
        },
        schoolId: {
            type: DataTypes.INTEGER,
            references: { model: 'schools', key: 'id'}
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
            references: {model: 'schoolstaffs', key: 'id'}
        },
        disableDate: {
            type: DataTypes.DATE
        }
    }
}