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
            references: { model: 'schools', key: 'id'}
        },
        name: {
            type: DataTypes.STRING(191)
        },
        description: {
            type: DataTypes.TEXT
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }
}
