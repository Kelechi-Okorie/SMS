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
        termId: {
            type: DataTypes.INTEGER,
            references: { model: 'Terms', key: 'id' }
        },
        studentClassId: {
            type: DataTypes.INTEGER,
            references: { model: 'StudentClasses', key: 'id' }
        },
        studentId: {
            type: DataTypes.INTEGER,
            references: { model: 'Students', key: 'id' }
        },
        isPresent: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        takenBy: {
            type: DataTypes.INTEGER,
            references: { model: 'SchoolStaffs', key: 'id' }
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