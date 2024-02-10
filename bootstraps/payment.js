module.exports = (Sequelize) => {
    const { DataTypes } = Sequelize;

    return {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.INTEGER,
            references: { model: 'users', key: 'id'}
        },
        schoolId: {
            type: DataTypes.INTEGER,
            references: { model: 'schools', key: 'id'}
        },
        termId: {
            type: DataTypes.INTEGER,
            references: { model: 'terms', key: 'id'}
        },
        paymentGateway: {
            type: DataTypes.STRING(191)
        },
        reference: {
            type: DataTypes.STRING(191),
            unique: true
        },
        description: {
            type: DataTypes.STRING(191)
        },
        amount: {
            type: DataTypes.INTEGER
        },
        imagePath: {
            type: DataTypes.STRING
        },
        isConfirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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