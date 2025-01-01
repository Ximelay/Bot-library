const { DataTypes } = require("sequelize");
const sequelize = require('../config/sequelize')
const User = require('./User')
const Book = require('./Book')

const Recommendation = sequelize.define('Recommendation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, {
    tableName: 'Recommendation',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

Recommendation.belongsTo(User, {foreignKey: 'user_id', onDelete: 'CASCADE'});
Recommendation.belongsTo(Book, {foreignKey: 'book_id', onDelete: 'CASCADE'});

module.exports = Recommendation;