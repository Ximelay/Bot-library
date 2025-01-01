require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const startCommand = require('./commands/start')

const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

bot.onText(/\/start/, (msg) => startCommand(bot, msg));

console.log('Бот запущен')