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
            references: { model: 'Users', key: 'id'}
        },
        schoolId: {
            type: DataTypes.INTEGER,
            references: { model: 'Schools', key: 'id'}
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
            references: {model: 'SchoolStaffs', key: 'id'}
        },
        disableDate: {
            type: DataTypes.DATE
        }
    }
}