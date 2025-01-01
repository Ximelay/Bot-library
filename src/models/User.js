const { DataTypes } = require("sequelize");
const sequelize = require('../config/sequelize')

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    telegram_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
    },
    first_name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING,
    },
}, {
    tableName: "users",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

module.exports = User;