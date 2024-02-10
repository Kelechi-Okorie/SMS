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
            references: {model: 'studentresults', key: 'id'}
        },
        subjectId: {
            type: DataTypes.INTEGER,
            references: {model: 'subjects', key: 'id'}
        },
        schoolStaffId: {
            type: DataTypes.INTEGER,
            references: {model: 'schoolstaffs', key: 'id'}
        },
        gradeId: {
            type: DataTypes.INTEGER,
            references: {model: 'grades', key: 'id'}
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