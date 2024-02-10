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
            references: { model: 'schools', key: 'id' }
        },
        sessionId: {
            type: DataTypes.INTEGER,
            references: { model: 'sessions', key: 'id' }
        },
        schoolClassId: {
            type: DataTypes.INTEGER,
            references: { model: 'schoolclasses', key: 'id' }
        },
        classDemarcationId: {
            type: DataTypes.INTEGER,
            references: { model: 'classdemarcations', key: 'id' }
        },
        managerId: {
            type: DataTypes.INTEGER,
            references: { model: 'schoolstaffs', key: 'id'}
        }
    }
}
