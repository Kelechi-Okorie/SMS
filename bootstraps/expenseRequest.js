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
        name: {
            type: DataTypes.STRING(191),
            allowNull: false
        },
        items: {
            type: DataTypes.STRING,
            get: function () {
                return JSON.parse(this.getDataValue("items"));
            },
            set: function (value) {
                return this.setDataValue("items", JSON.stringify(value));
            }
        },
        requestedAmount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        approvedAmount: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        description: {
            type: DataTypes.TEXT
        },
        requestedBy: {
            type: DataTypes.INTEGER,
            references: { model: 'schoolstaffs', key: 'id' }
        },
        isApproved: {
            type: DataTypes.BOOLEAN
        },
        approvedBy: {
            type: DataTypes.INTEGER,
            references: { model: 'schoolstaffs', key: 'id' }
        },
        approvalDate: {
            type: DataTypes.DATE
        },
        isRejected: {
            type: DataTypes.BOOLEAN
        },
        rejectedBy: {
            type: DataTypes.INTEGER,
            references: { model: 'schoolstaffs', key: 'id' }
        },
        rejectionDate: {
            type: DataTypes.DATE
        },
        rejectionReason: {
            type: DataTypes.TEXT
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
    }
}