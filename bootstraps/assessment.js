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
        ordinal: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(191),
            allowNull: false
        },
        maximumScore: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
}