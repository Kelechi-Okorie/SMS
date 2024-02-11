module.exports = (Sequelize) => {
    const { DataTypes } = Sequelize;

    return {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        schoolTypeId: {
            type: DataTypes.INTEGER,
            references: { model: 'SchoolTypes', key: 'id' }
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING(191),
            unique: true
        }
    }
}