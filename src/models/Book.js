const { DataTypes } = require("sequelize");
const sequelize = require('../config/sequelize')

const Book = sequelize.define("Book", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    language: {
        type: DataTypes.STRING,
    },
    year_of_publication: {
        type: DataTypes.INTEGER,
    },
    link: {
        type: DataTypes.STRING,
    },
}, {
    tableName: "Book",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

module.exports = Book;