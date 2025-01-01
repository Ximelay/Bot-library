const sequelize = require('./config/sequelize');
const User = require('./models/User');
const Book = require('./models/Book');
const Favorite = require('./models/Favorite');
const Recommendation = require('./models/Recommendation');

const syncDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log('Подключение к БД установлено')

        await sequelize.sync({ alter: true}) // `alter: true` обновит существующую структуру таблиц
        console.log('Все таблицы синхронизированы')
    } catch (error) {
        console.error('Ошибка синхронизации: ', error)
    } finally {
        await sequelize.close()
    }
};

syncDatabase()