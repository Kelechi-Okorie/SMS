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
            references: {model: 'schools', key: 'id'}
        },
        name: {
            type: DataTypes.STRING(191),
        },
        isStarted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isEnded: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        startDate: {
            type: DataTypes.DATE
        },
        endDate: {
            type: DataTypes.DATE
        },
        isCurrentSession: {
            type: DataTypes.BOOLEAN
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