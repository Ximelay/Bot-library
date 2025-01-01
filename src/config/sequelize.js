require('dotenv').config()

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME, // Имя базы данных
    process.env.DB_USER, // Пользователь
    process.env.DB_PASSWORD, // Пароль
    {
        host: process.env.DB_HOST, // Хост
        dialect: 'postgres', // Тип базы данных
        port: process.env.DB_PORT, // Порт
        logging: false, // Отключить SQL-логи
    }
);

module.exports = sequelize;