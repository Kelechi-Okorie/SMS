module.exports = (Sequelize) => {
    const { DataTypes } = Sequelize;

    return {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        schoolTypeId: {
            type: DataTypes.INTEGER,
            references: { model: 'schooltypes', key: "id"}
        },
        value: {
            type: DataTypes.TEXT,
            get: function () {
                return JSON.parse(this.getDataValue("value"));
            },
            set: function (value) {
                return this.setDataValue("value", JSON.stringify(value));
            }

        }
    };
};