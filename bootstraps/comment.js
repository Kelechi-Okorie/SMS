module.exports = (Sequelize) => {
    const { DataTypes } = Sequelize;

    return {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        message: {
            type: DataTypes.TEXT
        },
        schoolId: {
            type: DataTypes.INTEGER,
            references: { model: 'schools', key: 'id' }
        },
        schoolStaffId: {
            type: DataTypes.INTEGER,
            references: { model: 'schoolstaffs', key: 'id' }
        },
        studentId: {
            type: DataTypes.INTEGER,
            references: { model: 'students', key: 'id' }
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            set(value) {
                this.setDataValue('createdAt', new Date());
            }
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            set(value) {
                this.setDataValue('updatedAt', new Date());
            }
        }
    };
};