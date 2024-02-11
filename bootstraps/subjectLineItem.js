module.exports = (Sequelize) => {
    const { DataTypes } = Sequelize;

    return {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        studentResultId: {
            type: DataTypes.INTEGER,
            references: {model: 'StudentResults', key: 'id'}
        },
        subjectId: {
            type: DataTypes.INTEGER,
            references: {model: 'Subjects', key: 'id'}
        },
        schoolStaffId: {
            type: DataTypes.INTEGER,
            references: {model: 'SchoolStaffs', key: 'id'}
        },
        gradeId: {
            type: DataTypes.INTEGER,
            references: {model: 'Grades', key: 'id'}
        },
        score: {
            type: DataTypes.INTEGER
        },
        createdAt: {
            type: DataTypes.DATE,
            set(value) {
                this.setDataValue('createdAt', new Date());
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            set(value) {
                this.setDataValue('createdAt', new Date());
            }
        }
    }
}