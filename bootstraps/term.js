module.exports = (Sequelize) => {
    const { DataTypes } = Sequelize;

    return {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        sessionId: {
            type: DataTypes.INTEGER,
            references: { model: 'Sessions', key: 'id' }
        },
        name: {
            type: DataTypes.STRING(191)
        },
        termNumber: {
            type: DataTypes.INTEGER
        },
        isStarted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isEnded: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isCurrentTerm: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        amountPaid: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        startDate: {
            type: DataTypes.DATE
        },
        endDate: {
            type: DataTypes.DATE
        }
    }
}
