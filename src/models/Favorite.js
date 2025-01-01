const { DataTypes } = require("sequelize");
const sequelize = require('../config/sequelize')
const User = require('./User')
const Book = require('./Book')

const Favorite = sequelize.define("Favorite", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, {
    tableName: "favorites",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

Favorite.belongsTo(User, {foreignKey: 'user_id', onDelete: 'CASCADE'});
Favorite.belongsTo(Book, {foreignKey: 'book_id', onDelete: 'CASCADE'});

module.exports = Favorite;