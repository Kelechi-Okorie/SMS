module.exports = (Sequelize) => {
    const { DataTypes } = Sequelize;

    return {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        schoolStaffId: {
            type: Sequelize.INTEGER
        },
        subjectId: {
            type: Sequelize.INTEGER
        }
    }
}