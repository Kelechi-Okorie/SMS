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
            references: { model: 'Schools', key: 'id' }
        },
        sessionId: {
            type: DataTypes.INTEGER,
            references: { model: 'Sessions', key: 'id' }
        },
        schoolClassId: {
            type: DataTypes.INTEGER,
            references: { model: 'SchoolClasses', key: 'id' }
        },
        classDemarcationId: {
            type: DataTypes.INTEGER,
            references: { model: 'Demarcations', key: 'id' }
        },
        managerId: {
            type: DataTypes.INTEGER,
            references: { model: 'SchoolStaffs', key: 'id'}
        }
    }
}
