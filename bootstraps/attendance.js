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
        termId: {
            type: DataTypes.INTEGER,
            references: { model: 'terms', key: 'id' }
        },
        studentClassId: {
            type: DataTypes.INTEGER,
            references: { model: 'studentclasses', key: 'id' }
        },
        studentId: {
            type: DataTypes.INTEGER,
            references: { model: 'students', key: 'id' }
        },
        isPresent: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        takenBy: {
            type: DataTypes.INTEGER,
            references: { model: 'schoolstaffs', key: 'id' }
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATEONLY,
            set(value) {
                this.setDataValue('createdAt', new Date());
            }
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATEONLY,
            set(value) {
                this.setDataValue('updatedAt', new Date());
            }
        }
    }
};