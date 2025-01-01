const axios = require('axios');
const cheerio = require('cheerio');

const searchCommand = async (bot, msg, match) => {
    const chatId = msg.chat.id;
    const query = match[1]?.trim();

    if (!query) {
        bot.sendMessage(chatId, '🔍 Пожалуйста, введите ключевые слова для поиска. Пример: /search Python для начинающих');
        return;
    }

    try {
        // Показать "typing" индикатор перед началом поиска
        bot.sendChatAction(chatId, 'typing');

        // 1. Поиск на Library Genesis
        const libgenBaseUrl = 'https://libgen.st'; // Альтернативное зеркало
        const libgenUrl = `${libgenBaseUrl}/search.php?req=${encodeURIComponent(query)}&open=0&res=25&view=simple&phrase=1&column=def`;
        console.log(`[LOG]: Выполняется запрос к LibGen: ${libgenUrl}`);

        const response = await axios.get(libgenUrl);
        const $ = cheerio.load(response.data);

        // Извлечение результатов поиска
        const rawResults = [];
        $('table > tbody > tr').each((index, element) => {
            const title = $(element).find('td:nth-child(2) a').first().text().trim();
            const link = $(element).find('td:nth-child(2) a').first().attr('href');

            if (title && link) {
                rawResults.push({ title, link: `${libgenBaseUrl}/${link}` });
            }
        });

        // Удаление первых двух предопределённых результатов
        const filteredResults = rawResults.slice(2);

        // Убираем дубликаты и ограничиваем количество выводимых результатов до 5
        const uniqueResults = [];
        const seenTitles = new Set();

        for (const result of filteredResults) {
            if (!seenTitles.has(result.title)) {
                uniqueResults.push(result);
                seenTitles.add(result.title);
            }

            // Прерываем, если собрали 5 записей
            if (uniqueResults.length >= 5) break;
        }

        if (uniqueResults.length > 0) {
            const formattedResults = uniqueResults.map((item, index) => {
                return `${index + 1}. 📚 *${item.title}*\n[Скачать книгу](${item.link})`;
            }).join('\n\n');

            bot.sendMessage(chatId, `📚 Найдены книги на LibGen:\n\n${formattedResults}`, { parse_mode: 'Markdown' });
        } else {
            bot.sendMessage(chatId, `🙁 К сожалению, книг по запросу "${query}" не найдено на LibGen.`);
        }
    } catch (err) {
        console.error('Ошибка команды /search:', err.message);
        bot.sendMessage(chatId, '🚨 Произошла ошибка при поиске на LibGen. Попробуйте позже.');
    } finally {
        // Убираем индикатор активности после завершения
        bot.sendChatAction(chatId, 'typing');
    }

    // 2. Поиск на Project Gutenberg
    try {
        // Показать "typing" индикатор для Project Gutenberg
        bot.sendChatAction(chatId, 'typing');

        const gutenbergResponse = await axios.get('http://gutendex.com/books', {
            params: { search: query },
        });

        const gutenbergBooks = gutenbergResponse.data.results;

        if (gutenbergBooks && gutenbergBooks.length > 0) {
            const gutenbergResults = gutenbergBooks.map((book, index) => {
                return `${index + 1}. 📚 *${book.title}*\nАвтор: ${book.authors?.map(a => a.name).join(', ') || 'Неизвестно'}\n[Скачать книгу](https://www.gutenberg.org/ebooks/${book.id})`;
            }).join('\n\n');

            bot.sendMessage(chatId, `📚 Найдены книги на Project Gutenberg:\n\n${gutenbergResults}`, { parse_mode: 'Markdown' });
        }
    } catch (err) {
        console.error('Ошибка поиска на Project Gutenberg:', err.message);
        bot.sendMessage(chatId, '🚨 Произошла ошибка при поиске на Project Gutenberg. Попробуйте позже.');
    } finally {
        // Убираем индикатор активности после завершения
        bot.sendChatAction(chatId, 'typing');
    }
};

module.exports = searchCommand;