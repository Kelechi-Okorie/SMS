module.exports = (Sequelize) => {
    const { DataTypes } = Sequelize;

    return {
        studentClassId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'StudentClasses',
                key: 'id'
            }
        },
        studentId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Students',
                key: 'id'
            }
        }
    };
}