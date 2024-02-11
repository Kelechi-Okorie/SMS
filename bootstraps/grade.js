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
            type: DataTypes.STRING
        },
        min: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        max: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        remarks: {
            type: DataTypes.STRING(191),
        },
    }
}