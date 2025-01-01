require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const startCommand = require('./commands/start')
const searchCommand = require('./commands/search')

const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

bot.onText(/\/start/, (msg) => startCommand(bot, msg));

bot.onText(/\/search(.*)/, (msg, match) => {
    console.log(`[LOG]: Команда /search вызвана пользователем ${msg.chat.id}`);
    searchCommand(bot, msg, match);
});
console.log('Бот запущен')