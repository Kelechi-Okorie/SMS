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
            references: { model: 'Schools', key: 'id' }
        },
        schoolStaffId: {
            type: DataTypes.INTEGER,
            references: { model: 'SchoolStaffs', key: 'id' }
        },
        studentId: {
            type: DataTypes.INTEGER,
            references: { model: 'Students', key: 'id' }
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