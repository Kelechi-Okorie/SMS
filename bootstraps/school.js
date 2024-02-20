module.exports = (Sequelize) => {
    const { DataTypes } = Sequelize;

    return {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        uid: {
            type: DataTypes.STRING(191),
        },
        schoolTypeId: {
            type: Sequelize.INTEGER,
            references: { model: 'SchoolTypes', key: 'id' }
        },
        name: {
            type: DataTypes.TEXT
        },
        phone: {
            type: DataTypes.STRING(191)
        },
        email: {
            type: DataTypes.STRING(191)
        },
        isDisabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        disablingReason: {
            type: DataTypes.STRING(191)
        },
        disablingUserId: {
            type: DataTypes.INTEGER,
            references: { model: 'Users', key: 'id' }
        },
        disabledAt: {
            type: DataTypes.DATE
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