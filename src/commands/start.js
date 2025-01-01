const User = require('../models/User')

const startCommand = async (bot, msg) => {
    const chatId = msg.chat.id;
    const { username, first_name, last_name } = msg.chat;
    try {
        // Добавление в БД
        const [user, created] = await User.findOrCreate({
            where: { telegram_id: chatId },
            defaults: {
                username,
                first_name,
                last_name,
            },
        });

        if (created) {
            bot.sendMessage(chatId, `👋 Привет, ${first_name || 'пользователь'}! Вы успешно зарегистрированы в библиотеке.`);
        } else {
            bot.sendMessage(chatId, `👋 С возвращением, ${first_name || 'пользователь'}!`);
        }
    } catch (err) {
        console.error('Ошибка в команде /start', err.message);
        bot.sendMessage(chatId, `🚨 Произошла ошибка. Пожалуйста, попробуйте позже.`)
    }
};

module.exports = startCommand